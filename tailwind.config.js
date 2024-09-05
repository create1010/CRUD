/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*', './src/**/*.{html, js, ts, vue}', './index.html'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#ff9671'
      },
      backgroundImage: {
        form: "url('/img/Form_bg.jpg')"
      }
    }
  },
  plugins: []
}
