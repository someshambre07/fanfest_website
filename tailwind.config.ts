import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0A10",
        ink2: "#141220",
        paper: "#F5F2EA",
        hotpink: "#FF3D8A",
        ember: "#FF7A1A",
        violet: "#8B5CF6",
        acid: "#D4FF3D",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "spotlight-grad":
          "radial-gradient(60% 60% at 30% 20%, rgba(255,61,138,0.35) 0%, rgba(255,61,138,0) 60%), radial-gradient(50% 50% at 80% 10%, rgba(139,92,246,0.30) 0%, rgba(139,92,246,0) 60%), radial-gradient(45% 45% at 60% 90%, rgba(255,122,26,0.25) 0%, rgba(255,122,26,0) 60%)",
        "brand-grad": "linear-gradient(95deg, #FF3D8A 0%, #FF7A1A 100%)",
        "brand-grad-v": "linear-gradient(180deg, #FF3D8A 0%, #8B5CF6 100%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px) rotate(var(--r,0deg))" },
          "50%": { transform: "translateY(-10px) rotate(var(--r,0deg))" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
