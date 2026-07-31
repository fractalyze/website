import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Two breakpoints, three tiers, one per canvas the design was drawn on,
    // replacing Tailwind's five. `xl` is the desktop breakpoint: 1024, not
    // Tailwind's 1280, because 1024 is the width the tablet frames were drawn at
    // and so the width at which they stop applying. The root rule in globals.css
    // switches there too and the two have to stay in step.
    screens: {
      md: '768px',
      xl: '1024px',
    },
    extend: {
      fontFamily: {
        display: ['"Times New Roman"', 'Times', 'serif'],
        sans: ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      // Type scale transcribed from the 260728 design. Line heights are baked in
      // because the design pairs each size with a fixed leading.
      //
      // Headings are in rem and scale with the root, so the desktop layout stays
      // proportional as it narrows. Everything a reader reads at length is in
      // px and does not, because scaling it means a 1440 laptop — the commonest
      // desktop width there is — rendering 16px body copy at 12px. The design
      // draws body copy at one size on every canvas it was drawn on: 18px at
      // 1920 and 18px at 1024, 14px at 360. Pixels are what say that.
      //
      // The two notations agree wherever the root is 16px, which is every width
      // below the desktop breakpoint and 1920 above it, so this pins the middle
      // of the desktop range and changes nothing at either end. Article bodies
      // have opted out the same way since the blog landed; see the typography
      // block below.
      fontSize: {
        'display-1': ['5rem', {lineHeight: '4.5rem'}],
        'display-2': ['4.5rem', {lineHeight: '4.95rem'}],
        'display-3': ['3.25rem', {lineHeight: '3.575rem'}],
        'display-4': ['2.5rem', {lineHeight: '2.75rem'}],
        'title-1': ['2rem', {lineHeight: '2.2rem'}],
        'title-2': ['1.75rem', {lineHeight: '1.925rem'}],
        'title-3': ['1.5rem', {lineHeight: '1.65rem'}],
        'title-4': ['1.25rem', {lineHeight: '1.375rem'}],
        'body-lg': ['18px', {lineHeight: '27px'}],
        body: ['16px', {lineHeight: '24px'}],
        'body-sm': ['14px', {lineHeight: '21px'}],
        // Buttons and nav links.
        label: ['14px', {lineHeight: '21px'}],
        caption: ['13px', {lineHeight: '19.5px'}],
        micro: ['12px', {lineHeight: '13.2px'}],
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
