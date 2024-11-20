import type { Config } from "tailwindcss";

export default {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#f97316', // Define custom orange shade if needed
        },
        ringColor: {
          DEFAULT: 'orange-500', // Set the default ring color
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
