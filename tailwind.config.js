/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "hsl(240, 15%, 2%)",
        foreground: "hsl(0, 0%, 96%)",
        card: "hsl(240, 12%, 3%)",
        popover: "hsl(240, 12%, 3%)",
        primary: "hsl(265, 83%, 65%)",
        secondary: "hsl(240, 10%, 5%)",
        accent: "hsl(280, 70%, 60%)",
        destructive: "hsl(0, 84.2%, 60.2%)",
        border: "hsl(240, 10%, 10%)",
        input: "hsl(240, 10%, 5%)",
        ring: "hsl(265, 83%, 65%)",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, hsl(265,83%,65%) 0%, hsl(280,70%,60%) 100%)",
        "gradient-magic":
          "linear-gradient(135deg, hsl(265,83%,65% / 0.08) 0%, hsl(280,70%,60% / 0.08) 50%, hsl(220,80%,60% / 0.08) 100%)",
      },
      keyframes: {
        sparkle: {
          "0%, 100%": { backgroundPosition: "0% 0%", opacity: "0.3" },
          "50%": { backgroundPosition: "100% 100%", opacity: "0.5" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        "ornate-glow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        sparkle: "sparkle 8s ease-in-out infinite",
        "ornate-glow": "ornate-glow 6s ease infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};
