/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

    // my-app/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <- dette erstatter behovet for `next export`
  // (valgfritt) basePath/assetPrefix etc. om du trenger
};

module.exports = nextConfig;
}

module.exports = nextConfig
