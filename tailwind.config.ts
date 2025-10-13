// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#F2E6D8",
        gold: "#C9A227",
        espresso: "#2E2A27",
        ivory: "#FFFCF6",
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.06)" },
    },
  },
  plugins: [],
};

export default config;
