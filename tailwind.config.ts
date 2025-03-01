import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8", //Main page background color
        headline: "#40515E", //Headlines
        button: '#141413', // Main brand color, buttons, links
        buttonText: "#ffffff", //Button text color
        paragraph: "#475467", //Text color, primary readable content
        stroke: '#D1D5DB', // Default border/ stroke/ input placeholder text
        secondary: '#F0EFEB', // Containers, cards, secondary elements
        accent: '#D17557', // Container buttons 
        tertiary: '#FAFAF8', // Container buttons text
        // error: '#DC2626', // Red for errors
        // success: '#16A34A', // Green for success messages
        // warning: '#EAB308', // Yellow for warnings
      },
    },
  },
  plugins: [],
} satisfies Config;
