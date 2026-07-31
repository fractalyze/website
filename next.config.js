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
  // Posts that were published, indexed, and shared before being withdrawn. The
  // listing is the nearest page that still stands; without these the links in
  // search results and other people's posts end at a 404.
  async redirects() {
    return [
      'fastest-groth16-cpu-prover',
      'gpu-fusion-zk-optimization',
      'leanvm-progress-1-poseidon2',
      'leanvm-progress-2-packed-poseidon2',
    ].map((slug) => ({source: `/blog/${slug}`, destination: '/blog', permanent: true}));
  },
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
        //
        // Matched on the extension because post images and post pages share the
        // /blog prefix: `/blog/:path*` also catches every article, and handed
        // readers a week-old copy of one for a week after it changed.
        source: '/blog/:file(.*\\.(?:png|jpe?g|gif|webp|avif|svg))',
        headers: [{key: 'Cache-Control', value: 'public, max-age=604800'}],
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
