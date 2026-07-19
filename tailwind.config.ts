import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // SpendWise brand: deep indigo primary, emerald accent, slate neutral
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",   // indigo-500 – primary
          600: "#4f46e5",
          700: "#4338ca",
          900: "#1e1b4b",
        },
        accent: {
          400: "#34d399",   // emerald-400
          500: "#10b981",   // emerald-500 – success / savings
          600: "#059669",
        },
        danger: {
          400: "#f87171",
          500: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
