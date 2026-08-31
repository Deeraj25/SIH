import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          forest: "#1b4332",
          "forest-dark": "#081c15",
          "forest-light": "#2d6a4f",
          emerald: "#40916c",
          mint: "#52b788",
          leaf: "#74c69d",
          pale: "#b7e4c7",
          gold: "#e9c46a",
          "gold-dark": "#d4a373",
          amber: "#f4a261",
          earth: "#e76f51",
          cream: "#fbfbf8",
          bg: "#f8f9fa",
          surface: "#ffffff",
          slate: "#1e293b",
          muted: "#64748b",
          border: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-gentle": "bounce 2s infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
