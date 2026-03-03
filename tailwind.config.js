/** @type {import('tailwindcss').Config} */
import fluid, { extract, fontSize, screens } from 'fluid-tailwind'
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: "selector",
    content: {
        files: ["./src/**/*.{html,njk,js}"],
        extract,
    },
    theme: {
        fontSize: fontSize,
        screens: screens,
        extend: {
            fontFamily: {
                "baskervville": ["Baskervville", defaultTheme.fontFamily.sans],
                "barlow": ["Barlow", "sans-serif"],
            },
            colors: {
                primary: "#D0B4A2",
                secondary: "#E2DDD6",
                grey: "#707070"
            }
        },
    },
    plugins: [
        fluid,
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
    ],
}