const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px	",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        white: "#ffffff",
        blue: {
          light: "#00376b",
          medium: "#0095f6",
        },
        gray: {
          primary: "#262626",
          light: "#8e8e8e",
          medium: "#fafafa",
        },
        red: {
          primary: "#ed4956",
        },
        fuchsia: colors.fuchsia,
      },
      width: {
        500: "500px",
        350: "350px",
      },
      inset: {
        "-1.75": "-.438rem",
      },
      zIndex: {
        1000: "1000",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit,minmax(350px,1fr))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
