import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        kitto: {
          primary: "#7C3AED",
          secondary: "#EC4899",
          surface: "#f9fafb",
          "text-primary": "#111827",
          "text-muted": "#6B7280",
        },
      },
      backgroundImage: {
        "kitto-gradient": "linear-gradient(135deg, #7C3AED, #EC4899)",
      },
    },
  },
  plugins: [],
};
export default config;
