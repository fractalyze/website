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
        // Buttons and nav links. The design sets these at 14px, which is what
        // 0.875rem comes to once the root reaches its ceiling; the floor holds
        // that size on the narrower desktops where the root scales down, rather
        // than letting a control shrink to 10.5px along with the page.
        label: ['max(0.875rem,14px)', {lineHeight: '1.3125rem'}],
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
            // Pixels, not rem: an article opts out of the viewport scaling the
            // rest of the site uses, for the reason given in PostLayout. Every
            // length below is em so the whole scale hangs off this one number —
            // and heading margins resolve against their own heading, which is
            // why they are not the same figures as the body's.
            fontSize: '16px',
            lineHeight: '1.75',
            p: {marginTop: '1.25em', marginBottom: '1.25em'},
            h2: {
              fontSize: '1.5em',
              lineHeight: '1.3',
              fontWeight: '600',
              marginTop: '2em',
              marginBottom: '0.6667em',
            },
            h3: {
              fontSize: '1.25em',
              lineHeight: '1.4',
              fontWeight: '600',
              marginTop: '1.8em',
              marginBottom: '0.6em',
            },
            h4: {
              fontSize: '1.0625em',
              lineHeight: '1.5',
              fontWeight: '600',
              marginTop: '1.6471em',
              marginBottom: '0.4706em',
            },
            'ul, ol': {marginTop: '1.25em', marginBottom: '1.25em'},
            li: {marginTop: '0.5em', marginBottom: '0.5em'},
            'li > p': {marginTop: '0.5em', marginBottom: '0.5em'},
            blockquote: {marginTop: '1.75em', marginBottom: '1.75em'},
            pre: {marginTop: '1.75em', marginBottom: '1.75em'},
            table: {marginTop: '1.75em', marginBottom: '1.75em'},
            hr: {marginTop: '2.5em', marginBottom: '2.5em'},
            img: {marginTop: '1.75em', marginBottom: '1.75em'},
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
