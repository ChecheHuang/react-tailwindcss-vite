/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      {
        mytheme: {
          primary: '#f92053',
          secondary: '#afffc1',
          accent: '#0d52e5',
          neutral: '#253341',
          'base-100': '#2d4562',
          info: '#4a85d9',
          success: '#269c6d',
          warning: '#c2690a',
          error: '#ee3a6d',
        },
      },
    ],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
