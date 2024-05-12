/** @type {import('tailwindcss').Config} */
const tailwindColors = require("./node_modules/tailwindcss/colors");
const colorSafeList = [];

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = [
  "lightBlue",
  "warmGray",
  "trueGray",
  "coolGray",
  "blueGray",
];

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName)) {
    continue;
  }

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const pallette = tailwindColors[colorName];

  if (typeof pallette === "object") {
    shades.forEach((shade) => {
      if (shade in pallette) {
        colorSafeList.push(`text-${colorName}-${shade}`);
        colorSafeList.push(`bg-${colorName}-${shade}`);
      }
    });
  }
}

module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: tailwindColors,
      transitionProperty: {
        multiple: "width , height , backgroundColor , border-radius",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
