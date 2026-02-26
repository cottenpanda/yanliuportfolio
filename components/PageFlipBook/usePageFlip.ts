"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const TOTAL_PAGES = 5;
const SNAP_THRESHOLD = 90; // degrees
const CLICK_THRESHOLD = 5; // pixels — below this, treat as click not drag

export function usePageFlip() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Refs for drag performance and to avoid stale closures
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false); // true if pointer moved > CLICK_THRESHOLD
  const startXRef = useRef(0);
  const leafRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const currentPageRef = useRef(0);
  const isFlippingRef = useRef(false);
  const directionRef = useRef<"forward" | "backward">("forward");

  // Keep refs in sync with state
  currentPageRef.current = currentPage;
  isFlippingRef.current = isFlipping;

  const canGoForward = currentPage < TOTAL_PAGES - 1;
  const canGoBackward = currentPage > 0;

  const applyRotation = useCallback((deg: number) => {
    if (leafRef.current) {
      leafRef.current.style.transform = `rotateY(${deg}deg)`;
    }
  }, []);

  const applyShading = useCallback((deg: number) => {
    const leaf = leafRef.current;
    if (!leaf) return;
    const shade = leaf.querySelector("[data-shade]") as HTMLElement | null;
    const highlight = leaf.querySelector("[data-highlight]") as HTMLElement | null;
    const progress = Math.abs(deg) / 180;
    if (shade) shade.style.opacity = String(progress * 0.3);
    if (highlight) highlight.style.opacity = String((1 - progress) * 0.15);
  }, []);

  const completeFlip = useCallback(
    (direction: "forward" | "backward") => {
      if (!leafRef.current) return;
      setIsFlipping(true);
      isFlippingRef.current = true;

      leafRef.current.classList.add("flip-snap");

      const targetDeg = direction === "forward" ? -180 : 0;
      applyRotation(targetDeg);
      applyShading(targetDeg);

      const onEnd = () => {
        if (!leafRef.current) return;
        leafRef.current.classList.remove("flip-snap");
        leafRef.current.removeEventListener("transitionend", onEnd);

        if (direction === "forward") {
          setCurrentPage((p) => {
            const next = Math.min(p + 1, TOTAL_PAGES - 1);
            currentPageRef.current = next;
            return next;
          });
        } else {
          setCurrentPage((p) => {
            const prev = Math.max(p - 1, 0);
            currentPageRef.current = prev;
            return prev;
          });
        }

        rotationRef.current = 0;
        applyRotation(0);
        applyShading(0);
        setIsFlipping(false);
        isFlippingRef.current = false;
      };

      leafRef.current.addEventListener("transitionend", onEnd);
    },
    [applyRotation, applyShading]
  );

  const snapBack = useCallback(
    (fromDirection: "forward" | "backward") => {
      if (!leafRef.current) return;
      setIsFlipping(true);
      isFlippingRef.current = true;

      leafRef.current.classList.add("flip-snap");

      const targetDeg = fromDirection === "backward" ? -180 : 0;
      applyRotation(targetDeg);
      applyShading(targetDeg);

      const onEnd = () => {
        if (!leafRef.current) return;
        leafRef.current.classList.remove("flip-snap");
        leafRef.current.removeEventListener("transitionend", onEnd);
        rotationRef.current = targetDeg;
        setIsFlipping(false);
        isFlippingRef.current = false;
      };

      leafRef.current.addEventListener("transitionend", onEnd);
    },
    [applyRotation, applyShading]
  );

  const flipForward = useCallback(() => {
    if (isFlippingRef.current || currentPageRef.current >= TOTAL_PAGES - 1) return;
    directionRef.current = "forward";
    completeFlip("forward");
  }, [completeFlip]);

  const flipBackward = useCallback(() => {
    if (isFlippingRef.current || currentPageRef.current <= 0) return;
    directionRef.current = "backward";
    // Start from -180 then animate to 0
    rotationRef.current = -180;
    applyRotation(-180);
    applyShading(-180);
    requestAnimationFrame(() => {
      completeFlip("backward");
    });
  }, [completeFlip, applyRotation, applyShading]);

  // Pointer handlers for drag
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isFlippingRef.current) return;
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = e.clientX;
      // Capture on the leaf div itself, not a child element
      leafRef.current?.setPointerCapture(e.pointerId);
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current || isFlippingRef.current) return;

      const dx = e.clientX - startXRef.current;

      // Only start treating as drag after threshold
      if (!hasDraggedRef.current && Math.abs(dx) < CLICK_THRESHOLD) return;
      hasDraggedRef.current = true;

      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => {
        const page = currentPageRef.current;
        const forward = page < TOTAL_PAGES - 1;
        const backward = page > 0;

        let deg = (dx / 300) * -180;

        if (deg < 0 && forward) {
          directionRef.current = "forward";
          deg = Math.max(deg, -180);
          deg = Math.min(deg, 0);
        } else if (deg > 0 && backward) {
          directionRef.current = "backward";
          deg = -180 + Math.min(deg, 180);
          deg = Math.max(deg, -180);
          deg = Math.min(deg, 0);
        } else {
          deg = 0;
        }

        rotationRef.current = deg;
        applyRotation(deg);
        applyShading(deg);
      });
    },
    [applyRotation, applyShading]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      cancelAnimationFrame(animFrameRef.current);

      // If no significant drag, treat as click
      if (!hasDraggedRef.current) {
        const leaf = leafRef.current;
        if (!leaf) return;
        const rect = leaf.getBoundingClientRect();
        const x = e.clientX - rect.left;
        // The leaf covers the right page. Clicking it = flip forward.
        // But we also want left-page clicks for backward — those are handled
        // by onBookClick on the parent.
        if (currentPageRef.current < TOTAL_PAGES - 1) {
          flipForward();
        }
        return;
      }

      // Handle drag snap
      const deg = rotationRef.current;
      const absDeg = Math.abs(deg);
      const dir = directionRef.current;

      if (dir === "forward") {
        if (absDeg >= SNAP_THRESHOLD && currentPageRef.current < TOTAL_PAGES - 1) {
          completeFlip("forward");
        } else {
          snapBack("forward");
        }
      } else {
        if (absDeg < SNAP_THRESHOLD && currentPageRef.current > 0) {
          completeFlip("backward");
        } else {
          snapBack("backward");
        }
      }
    },
    [flipForward, completeFlip, snapBack]
  );

  // Click on left page (book container, not the leaf) for backward flip
  const onBookClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFlippingRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isLeftHalf = x < rect.width / 2;

      // Only handle left-half clicks here; right-half is handled by leaf pointer
      if (isLeftHalf && currentPageRef.current > 0) {
        flipBackward();
      }
    },
    [flipBackward]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        flipForward();
      } else if (e.key === "ArrowLeft") {
        flipBackward();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flipForward, flipBackward]);

  return {
    currentPage,
    totalPages: TOTAL_PAGES,
    leafRef,
    isFlipping,
    canGoForward,
    canGoBackward,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onBookClick,
  };
}
