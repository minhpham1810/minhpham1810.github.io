import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      colors: {
        vscode: {
          bg: "#1e1e1e",
          sidebar: "#252526",
          activityBar: "#333333",
          editor: "#1e1e1e",
          statusBar: "#007acc",
          border: "#3e3e3e",
          text: "#cccccc",
          textMuted: "#858585",
          tabActive: "#1e1e1e",
          tabInactive: "#2d2d2d",
          highlight: "#264f78",
          type: "#4ec9b0",
          function: "#dcdcaa",
          parameter: "#9cdcfe",
          string: "#ce9178",
        },
      },
    },
  },
  plugins: [],
};
export default config;
