import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Times New Roman"', 'Times', 'serif'],
        sans: ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      // Type scale transcribed from the 260728 design. Line heights are baked in
      // because the design pairs each size with a fixed leading.
      fontSize: {
        'display-1': ['5rem', {lineHeight: '4.5rem'}],
        'display-2': ['4.5rem', {lineHeight: '4.95rem'}],
        'display-3': ['3.25rem', {lineHeight: '3.575rem'}],
        'display-4': ['2.5rem', {lineHeight: '2.75rem'}],
        'title-1': ['2rem', {lineHeight: '2.2rem'}],
        'title-2': ['1.75rem', {lineHeight: '1.925rem'}],
        'title-3': ['1.5rem', {lineHeight: '1.65rem'}],
        'title-4': ['1.25rem', {lineHeight: '1.375rem'}],
        'body-lg': ['1.125rem', {lineHeight: '1.6875rem'}],
        body: ['1rem', {lineHeight: '1.5rem'}],
        'body-sm': ['0.875rem', {lineHeight: '1.3125rem'}],
        // Button text scales with the rest of the page but stops at a legible
        // size; the design's 14px would otherwise render at 10.5px on a 1440
        // screen.
        label: ['max(0.875rem,12px)', {lineHeight: '1.3125rem'}],
        caption: ['0.8125rem', {lineHeight: '1.21875rem'}],
        micro: ['0.75rem', {lineHeight: '0.825rem'}],
      },
      colors: {
        ink: '#000000',
        paper: '#FFFFFF',
        surface: {
          DEFAULT: '#F5F5F5',
          raised: '#FEFEFE',
          sunken: '#E8E8E8',
        },
        muted: '#666666',
        subtle: '#999999',
        accent: {
          DEFAULT: '#D0CEEC',
          blue: '#A7C4F6',
        },
        line: {
          DEFAULT: '#E0E0E0',
          strong: '#BBBBBB',
          dark: '#333333',
          darker: '#0F0F0F',
        },
        // Retained for the blog/prose styles until the blog redesign lands.
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
      maxWidth: {
        content: '87.5rem',
        measure: '56rem',
      },
      spacing: {
        section: '6.25rem',
      },
      borderRadius: {
        '4xl': '1.25rem',
      },
      // Long-form defaults: the design mock spaces every block equally, which
      // reads fine in a short sample and poorly across a full article. Headings
      // get room above them, paragraphs breathe, and the measure stays open.
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#000000',
            '--tw-prose-headings': '#000000',
            '--tw-prose-links': '#000000',
            '--tw-prose-bold': '#000000',
            '--tw-prose-counters': '#666666',
            '--tw-prose-bullets': '#999999',
            '--tw-prose-hr': '#E0E0E0',
            '--tw-prose-quotes': '#666666',
            '--tw-prose-quote-borders': '#BBBBBB',
            '--tw-prose-captions': '#666666',
            '--tw-prose-code': '#000000',
            '--tw-prose-th-borders': '#E0E0E0',
            '--tw-prose-td-borders': '#E0E0E0',
            fontSize: '1rem',
            lineHeight: '1.75',
            p: {marginTop: '1.25rem', marginBottom: '1.25rem'},
            h2: {
              fontSize: '1.5rem',
              lineHeight: '1.3',
              fontWeight: '600',
              marginTop: '3rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.25rem',
              lineHeight: '1.4',
              fontWeight: '600',
              marginTop: '2.25rem',
              marginBottom: '0.75rem',
            },
            h4: {
              fontSize: '1.0625rem',
              lineHeight: '1.5',
              fontWeight: '600',
              marginTop: '1.75rem',
              marginBottom: '0.5rem',
            },
            'ul, ol': {marginTop: '1.25rem', marginBottom: '1.25rem'},
            li: {marginTop: '0.5rem', marginBottom: '0.5rem'},
            'li > p': {marginTop: '0.5rem', marginBottom: '0.5rem'},
            blockquote: {marginTop: '1.75rem', marginBottom: '1.75rem'},
            pre: {marginTop: '1.75rem', marginBottom: '1.75rem'},
            table: {marginTop: '1.75rem', marginBottom: '1.75rem'},
            hr: {marginTop: '2.5rem', marginBottom: '2.5rem'},
            img: {marginTop: '1.75rem', marginBottom: '1.75rem'},
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
