import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // Deep navy — primary brand colour carried over from the Finmirai card
        navy: {
          50: "#F2F5FA",
          100: "#E3E9F2",
          200: "#C3CFE0",
          300: "#94A8C4",
          400: "#5F7AA0",
          500: "#3B5680",
          600: "#253F66",
          700: "#18304F",
          800: "#10233D",
          900: "#0A1A30",
          950: "#06111F",
        },
        // Gold — accent. Use 600+ for text on light backgrounds (contrast), 300–400 on navy.
        gold: {
          50: "#FBF7EC",
          100: "#F5EBCD",
          200: "#EBD69B",
          300: "#DFBE65",
          400: "#D4A93F",
          500: "#C1922A",
          600: "#9E7520",
          700: "#7A5A1B",
        },
        ink: "#1B2433",
        mist: "#F6F7F9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10, 26, 48, 0.04), 0 4px 16px rgba(10, 26, 48, 0.06)",
        lift: "0 10px 30px rgba(10, 26, 48, 0.12)",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
