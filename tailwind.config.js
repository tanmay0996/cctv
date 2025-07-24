/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        gold:      '#B58D16',
        'gold-light': '#FFD54F',
        'bg-dark': '#0F111A',
        'surface': '#1C1F26',
        'text-primary': '#F5F5F5',
        'text-secondary': '#A3A3A3',
        'badge-red': '#EF4444',
        'badge-yellow': '#F59E0B',
        'badge-blue': '#2563EB',
      },
    },
  },
  plugins: [],
};
