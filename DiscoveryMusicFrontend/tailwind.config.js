/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#cf00ff",
          "primary-content": "#100016",
          secondary: "#001fff",
          "secondary-content": "#c8dcff",
          accent: "#00ea49",
          "accent-content": "#001302",
          neutral: "#11120d",
          "neutral-content": "#c9c9c8",
          "base-100": "#072739",
          "base-200": "#052030",
          "base-300": "#041a28",
          "base-content": "#c9cfd4",
          info: "#00c6ff",
          "info-content": "#000e16",
          success: "#74d41b",
          "success-content": "#051000",
          warning: "#fec800",
          "warning-content": "#160f00",
          error: "#ff7d97",
          "error-content": "#160508",
        },
      },
    ],
  },
};
