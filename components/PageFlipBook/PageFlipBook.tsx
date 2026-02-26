"use client";

import { siteConfig } from "@/lib/siteConfig";
import { renderBold } from "@/lib/renderBold";
import { usePageFlip } from "./usePageFlip";

const sections = siteConfig.sections;
const PAPER_COLOR = "#f2f1ee";

function LeftPage({ sectionIndex }: { sectionIndex: number }) {
  const section = sections[sectionIndex];
  if (!section) return <div className="w-full h-full" />;

  return (
    <div className="w-full h-full flex flex-col justify-center px-10 py-8">
      <p className="font-mono text-[11px] text-text-muted uppercase tracking-widest mb-3">
        {String(sectionIndex + 1).padStart(2, "0")} / {sections.length}
      </p>
      <h3 className="font-hand text-3xl text-text-primary mb-4 leading-tight">
        {section.title}
      </h3>
      <p className="text-text-secondary text-[14px] leading-relaxed">
        {renderBold(section.description)}
      </p>
    </div>
  );
}

function RightPage({ sectionIndex }: { sectionIndex: number }) {
  const section = sections[sectionIndex];
  if (!section) return <div className="w-full h-full" />;

  return (
    <div className="w-full h-full flex flex-col justify-center px-10 py-8">
      <div className="space-y-4 mb-6">
        {section.highlights.map((h, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-accent mt-0.5 flex-shrink-0">&#9670;</span>
            <p className="text-text-secondary text-[14px] leading-relaxed">
              {renderBold(h.text)}
            </p>
          </div>
        ))}
      </div>
      <a
        href={section.cta.url}
        className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:underline underline-offset-2 mt-auto"
      >
        {section.cta.label} <span>&rarr;</span>
      </a>
    </div>
  );
}

export default function PageFlipBook() {
  const {
    currentPage,
    totalPages,
    leafRef,
    canGoForward,
    canGoBackward,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onBookClick,
  } = usePageFlip();

  const nextPage = Math.min(currentPage + 1, totalPages - 1);

  return (
    <section className="hidden lg:flex flex-col items-center py-16 select-none">
      {/* Stage with perspective */}
      <div
        className="relative"
        style={{ perspective: "1400px" }}
        onClick={onBookClick}
      >
        {/* Background stack sheets - left side */}
        <div
          className="absolute rounded-l-md"
          style={{
            width: "340px",
            height: "440px",
            backgroundColor: "#e8e7e3",
            top: "6px",
            left: "-4px",
            boxShadow: "-2px 2px 8px rgba(0,0,0,0.06)",
            zIndex: 0,
          }}
        />
        <div
          className="absolute rounded-l-md"
          style={{
            width: "340px",
            height: "440px",
            backgroundColor: "#edece8",
            top: "3px",
            left: "-2px",
            boxShadow: "-1px 1px 4px rgba(0,0,0,0.04)",
            zIndex: 1,
          }}
        />

        {/* Background stack sheets - right side */}
        <div
          className="absolute rounded-r-md"
          style={{
            width: "340px",
            height: "440px",
            backgroundColor: "#e8e7e3",
            top: "6px",
            right: "-4px",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.06)",
            zIndex: 0,
          }}
        />
        <div
          className="absolute rounded-r-md"
          style={{
            width: "340px",
            height: "440px",
            backgroundColor: "#edece8",
            top: "3px",
            right: "-2px",
            boxShadow: "1px 1px 4px rgba(0,0,0,0.04)",
            zIndex: 1,
          }}
        />

        {/* Book spread */}
        <div className="relative flex" style={{ zIndex: 2 }}>
          {/* Left page */}
          <div
            className="rounded-l-lg overflow-hidden"
            style={{
              width: "340px",
              height: "440px",
              backgroundColor: PAPER_COLOR,
              boxShadow: "-4px 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <LeftPage sectionIndex={currentPage} />
          </div>

          {/* Right page (revealed after flip) */}
          <div
            className="rounded-r-lg overflow-hidden"
            style={{
              width: "340px",
              height: "440px",
              backgroundColor: PAPER_COLOR,
              boxShadow: "4px 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <RightPage sectionIndex={nextPage} />
          </div>

          {/* Center crease */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-full pointer-events-none"
            style={{
              width: "12px",
              background:
                "linear-gradient(to right, rgba(0,0,0,0.06), rgba(0,0,0,0.02), transparent, rgba(0,0,0,0.02), rgba(0,0,0,0.06))",
              zIndex: 10,
            }}
          />

          {/* Flip leaf */}
          <div
            ref={leafRef}
            className="absolute top-0 right-0 flip-leaf"
            style={{
              width: "340px",
              height: "440px",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              zIndex: 5,
              cursor: canGoForward ? "pointer" : "default",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Front face - current right page content */}
            <div
              className="absolute inset-0 rounded-r-lg overflow-hidden"
              style={{
                backgroundColor: PAPER_COLOR,
                backfaceVisibility: "hidden",
              }}
            >
              <RightPage sectionIndex={currentPage} />
              {/* Shade overlay */}
              <div
                data-shade=""
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: "rgba(0,0,0,1)",
                  opacity: 0,
                }}
              />
            </div>

            {/* Back face - next left page content */}
            <div
              className="absolute inset-0 rounded-l-lg overflow-hidden"
              style={{
                backgroundColor: PAPER_COLOR,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <LeftPage sectionIndex={nextPage} />
              {/* Highlight overlay */}
              <div
                data-highlight=""
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: "rgba(255,255,255,1)",
                  opacity: 0.15,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Page dots + hint */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{
                backgroundColor:
                  i === currentPage ? "#D97706" : "#D6D3D1",
              }}
            />
          ))}
        </div>
        <p className="text-text-muted text-xs font-mono">
          {canGoForward || canGoBackward
            ? "Click \u00B7 drag \u00B7 \u2190 \u2192 arrow keys to flip"
            : ""}
        </p>
      </div>
    </section>
  );
}
