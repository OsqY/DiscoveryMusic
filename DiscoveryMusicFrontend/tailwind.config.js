/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  daisyui: {
    themes: {
      mytheme: {
        "primary": "#9900ff",
        "primary-content": "#1e3a8a",
        "secondary": "#509200",
        "secondary-content": "#020800",
        "accent": "#5040ff",
        "accent-content": "#d6deff",
        "neutral": "#1d2130",
        "neutral-content": "#ccced2",
        "base-100": "#1f2623",
        "base-200": "#19201d",
        "base-300": "#141917",
        "base-content": "#cdcfce",
        "info": "#00aada",
        "info-content": "#000b11",
        "success": "#00d360",
        "success-content": "#001003",
        "warning": "#ff9200",
        "warning-content": "#160800",
        "error": "#ff575c",
        "error-content": "#160303",
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
}

