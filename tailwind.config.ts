import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      colors: {
        paper: "#FAFAFA",
        wash: "#F4F4F5",
        ink: "#09090B",
        muted: "#475569",
        line: "#E4E4E7",
        accent: "#2563EB",
      },
    },
  },
  plugins: [],
};

export default config;
