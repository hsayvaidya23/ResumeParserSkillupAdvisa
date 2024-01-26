/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#0066CC',
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      backgroundImage: {
        "hero_pattern": "url('/assets/images/banner.jpg')",
      },
    },
  },
  plugins: [],
}