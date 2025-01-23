/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#1E3A8A", // Głęboki niebieski
        secondaryBlue: "#3B82F6", // Jasny niebieski
        backgroundLight: "#F8FAFC", // Bardzo jasne tło
        paperEcru: "#F5F2E7", // Alternatywne tło
        goldAccent: "#D4AF37", // Złote akcenty (możesz zastąpić)
        errorRed: "#EF4444", // Dla ostrzeżeń
        darkBlue: "#1B1F3B",
      },
      fontFamily: {
        primary: ["Playfair Display", "serif"], // Nagłówki
        secondary: ["Roboto", "sans-serif"], // Treść
      },
      borderRadius: {
        card: "16px", // Większe zaokrąglenia dla kart
        button: "12px", // Delikatniejsze zaokrąglenia przycisków
      },
      boxShadow: {
        card: "0px 6px 12px rgba(0, 0, 0, 0.1)", // Mocniejsze cienie
        button: "0px 4px 8px rgba(30, 58, 138, 0.3)", // Cienie dla przycisków
      },
      backgroundImage: {
        inkGradient: "linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)", // Gradient niebieski
      },
    },
  },
  plugins: [],
};
