import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(52, 109, 219)',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: 'rgb(52, 109, 219)',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      typography: ({theme}: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[700]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-links': theme('colors.primary[600]'),
            '--tw-prose-bold': theme('colors.gray[900]'),
            '--tw-prose-counters': theme('colors.gray[500]'),
            '--tw-prose-bullets': theme('colors.gray[300]'),
            '--tw-prose-hr': theme('colors.gray[200]'),
            '--tw-prose-quotes': theme('colors.gray[900]'),
            '--tw-prose-quote-borders': theme('colors.gray[200]'),
            '--tw-prose-captions': theme('colors.gray[500]'),
            '--tw-prose-code': theme('colors.gray[900]'),
            '--tw-prose-pre-code': theme('colors.gray[200]'),
            '--tw-prose-pre-bg': theme('colors.gray[800]'),
            '--tw-prose-th-borders': theme('colors.gray[300]'),
            '--tw-prose-td-borders': theme('colors.gray[200]'),
            '--tw-prose-invert-body': theme('colors.gray[300]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-links': theme('colors.primary[400]'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.gray[400]'),
            '--tw-prose-invert-bullets': theme('colors.gray[600]'),
            '--tw-prose-invert-hr': theme('colors.gray[700]'),
            '--tw-prose-invert-quotes': theme('colors.gray[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.gray[700]'),
            '--tw-prose-invert-captions': theme('colors.gray[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.gray[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.gray[600]'),
            '--tw-prose-invert-td-borders': theme('colors.gray[700]'),
            fontSize: '1rem',
            lineHeight: '1.75',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4': {
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontSize: '1.5rem',
              marginTop: '2em',
              marginBottom: '0.75em',
            },
            h3: {
              fontSize: '1.25rem',
              marginTop: '1.75em',
              marginBottom: '0.5em',
            },
            code: {
              color: 'var(--tw-prose-code)',
              fontWeight: '600',
              fontSize: '0.875rem',
            },
            'code::before': {
              content: '"`"',
            },
            'code::after': {
              content: '"`"',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
            pre: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              color: 'var(--tw-prose-pre-code)',
              fontSize: '0.875em',
              lineHeight: '1.7',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
            },
            table: {
              fontSize: '0.9375rem',
            },
            thead: {
              borderBottomColor: 'var(--tw-prose-th-borders)',
            },
            'thead th': {
              fontWeight: '600',
              paddingBottom: '0.75rem',
            },
            'tbody tr': {
              borderBottomColor: 'var(--tw-prose-td-borders)',
            },
            'tbody td': {
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.0625rem',
            lineHeight: '1.75',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            h2: {
              fontSize: '1.75rem',
              marginTop: '2em',
              marginBottom: '0.875em',
            },
            h3: {
              fontSize: '1.375rem',
              marginTop: '1.75em',
              marginBottom: '0.625em',
            },
            pre: {
              padding: '1.25rem 1.75rem',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
