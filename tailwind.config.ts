import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a6a354',
          dark: '#858243',
          light: 'rgba(182, 176, 93, 0.9)',
      },
      orange: '#d17c2c',
      gray: {
        light: '#dcdcdc',
        'light-2': '#f2f2f2',
        dark: '#808080',
        darker: '#191919',
      },
    },
    fontFamily: {
      sans: ['var(--font-work-sans)', 'sans-serif'],
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
  },
},
  plugins: [],
};
export default config;
