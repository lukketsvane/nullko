// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        pink: '#FF90E8',
        red: '#98282A',
        babyblue: '#90A8ED',
        yellow: '#F1F333',
        orange: '#E2442F',
        teal: '#23A094',
        violet: '#B23386',
        dimGrey: '#78716C',
        whiteSmoke: '#F4F4F0',
        yellowDark: '#FFC900'
      }
    },
  },
  plugins: [],
};

export default config;
