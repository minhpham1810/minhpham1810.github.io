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
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      colors: {
        vscode: {
          bg: "#111310",
          sidebar: "#171915",
          activityBar: "#131511",
          editor: "#111310",
          statusBar: "#b85e47",
          border: "#2b2e27",
          text: "#dedfd8",
          textMuted: "#8e9188",
          tabActive: "#111310",
          tabInactive: "#171915",
          highlight: "#252820",
          surface: "#1c1f19",
          surfaceRaised: "#20231d",
          accent: "#b85e47",
          type: "#8fb4a8",
          function: "#c7b882",
          parameter: "#a7b5c2",
          string: "#c48974",
        },
      },
    },
  },
  plugins: [],
};
export default config;
