const siteMetadata = {
  title: 'Fractalyze',
  author: 'Fractalyze Team',
  headerTitle: 'Fractalyze',
  // The site's own positioning, in the site's own words: the hero's claim after
  // its title. This is the root `<meta name="description">` and the text every
  // share card of the home page carries, so it is read far more often off the
  // site than on it — and it named a single product, Zorch, long after the site
  // stopped being about one. `/compiler` and `/blog` declare their own.
  description:
    'The computing layer for cryptography. We build, optimize, and operate production cryptography systems.',
  language: 'en-us',
  siteUrl: 'https://www.fractalyze.io',
  email: 'contact@fractalyze.io',
  github: 'https://github.com/fractalyze',
  locale: 'en-US',
  // Hosted Tally form behind the Contact Us call to action; falls back to email when empty.
  contactFormUrl: 'https://tally.so/r/obY0eN',
  // Destination of the compiler page's "Awesome Zorch" call to action.
  zorchUrl: 'https://awesome-zorch.fractalyze.io',
  // Only entries with a URL are rendered in the footer.
  social: {
    linkedin: 'https://www.linkedin.com/company/fractalyze',
    x: 'https://x.com/fractalyze_io',
    github: 'https://github.com/fractalyze',
  },
};

module.exports = siteMetadata;
