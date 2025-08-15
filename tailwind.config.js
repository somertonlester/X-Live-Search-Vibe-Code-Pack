/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electricCyan: '#00D9FF',
        deepBlue: '#FFFFFF',
        gradientBlack: '#000000',
      },
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.white / 0.9'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.electricCyan'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.white / 0.7'),
            '--tw-prose-bullets': theme('colors.white / 0.7'),
            '--tw-prose-hr': theme('colors.white / 0.2'),
            '--tw-prose-quotes': theme('colors.white / 0.9'),
            '--tw-prose-quote-borders': theme('colors.white / 0.2'),
            '--tw-prose-captions': theme('colors.white / 0.7'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 0.2)',
            '--tw-prose-th-borders': theme('colors.white / 0.2'),
            '--tw-prose-td-borders': theme('colors.white / 0.1'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}