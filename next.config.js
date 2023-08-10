/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/country',
      destination: '/',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
