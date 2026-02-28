import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F5",
        "editor-surface": "#F5F5F4",
        "editor-border": "#E7E5E4",
        "text-primary": "#1C1917",
        "text-secondary": "#57534E",
        "text-muted": "#A8A29E",
        accent: "#D97706",
        "syn-keyword": "#7C3AED",
        "syn-string": "#059669",
        "syn-property": "#0891B2",
        "syn-comment": "#A8A29E",
        "syn-value": "#DC2626",
        "syn-plain": "#1C1917",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
