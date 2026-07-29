const {withContentlayer} = require('next-contentlayer2');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  turbopack: {},
  async headers() {
    return [
      {
        // Files under public/ are served must-revalidate by default, so the
        // webfont was re-checked on every load and the fallback rendered first
        // each time. The subset files are versioned by name.
        source: '/fonts/:path*',
        headers: [{key: 'Cache-Control', value: 'public, max-age=31536000, immutable'}],
      },
      {
        // Same revalidation cost applies to the cover art, and the image
        // optimizer takes its own cache lifetime from what the source declares.
        source: '/blog/:path*',
        headers: [{key: 'Cache-Control', value: 'public, max-age=604800'}],
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
