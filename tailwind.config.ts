import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    listStyleType: {
      square: 'square',
    },
    extend: {
      fontFamily: {
        flower: ['Indie Flower', 'cursive'],
      },
      colors: {
        base: '#F9F7F7',
        point1: '#DCF2F1',
        point2: '#D0E9F7',
        point3: '#7FC7D9',
        deep1: '#3F72AF',
        deep2: '#112D4E',
      },
      backgroundColor: {
        base: '#F9F7F7',
        point1: '#DCF2F1',
        point2: '#D0E9F7',
        point3: '#7FC7D9',
        deep1: '#3F72AF',
        deep2: '#112D4E',
      },
    },
  },
  plugins: [],
};
export default config;
