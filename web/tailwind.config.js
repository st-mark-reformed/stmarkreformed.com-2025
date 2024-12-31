const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                gold: '#f3c213',
                'crimson-lightened-3': '#eeadad',
                'crimson-lightened-2': '#da7f8e',
                'crimson-lightened-1': '#ca4b5f',
                crimson: '#c31132',
                'crimson-dark': '#a41130',
                goldenrod: '#df9c17',
                'saddle-brown-lightened-3': '#a89354',
                'saddle-brown-lightened-2': '#9b7e15',
                'saddle-brown-lightened-1': '#8b6e15',
                'saddle-brown': '#7b6014',
                'bronze-lightened-2': '#594b08',
                'bronze-lightened-1': '#493a08',
                bronze: '#392c08',
                // 'lightest-red': '#eeadad',
                // 'lighter-red': '#ee908f',
                // 'light-red': '#ca5153',
                // red: '#870f12',
                // 'dark-red': '#540a0c',
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        'ul>li>:first-child': {
                            marginTop: 0,
                            marginBottom: 0,
                        },
                        'ul>li>:last-child': {
                            marginTop: 0,
                            marginBottom: 0,
                        },
                        a: {
                            color: theme('colors.crimson'),
                            'text-decoration': 'underline',
                            '&:hover': {
                                color: theme('colors.crimson-dark'),
                            },
                        },
                    },
                },
                'over-dark': {
                    css: {
                        a: {
                            color: '#fff',
                            'text-decoration': 'underline',
                            '&:hover': {
                                color: theme('colors.gray.300'),
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        // Customize: https://github.com/tailwindlabs/tailwindcss-typography#customization
        // https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
    ],
};
