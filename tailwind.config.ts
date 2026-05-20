import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1A2B50",
        gold: "#C5A061",
        cream: "#F6F2E9",
        warmgray: "#CFCFCF",
        ink: "#24314A"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "Montserrat", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(26, 43, 80, 0.08)"
      },
      borderRadius: {
        brand: "8px"
      }
    }
  },
  plugins: []
};

export default config;
