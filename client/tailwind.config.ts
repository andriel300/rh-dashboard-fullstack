import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

// List of base colors to generate themes
const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

// Mapping of color shades, used to invert shades for dark theme
const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

// Function to generate a theme object based on provided colors and shade mapping
const generateThemeObject = (colors: any, mapping: any, invert = false) => {
  const theme: any = {}; // Initialize an empty object to store the theme
  baseColors.forEach((color) => {
    theme[color] = {}; // Initialize an empty object for each base color
    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadeKey = invert ? value : key; // Determine the shade key based on whether we are inverting
      theme[color][key] = colors[color][shadeKey]; // Assign the correct color shade to the theme
    });
  });
  return theme; // Return the generated theme object
};

// Generate light and dark themes using the generateThemeObject function
const lightTheme = generateThemeObject(colors, shadeMapping); // Generate light theme
const darkTheme = generateThemeObject(colors, shadeMapping, true); // Generate dark theme with inverted shades

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"],
  },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(themes)],
};
export default config;
