module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/admin',
        destination: '/admin/usuario',
        permanent: false,
      },
      // Wildcard path matching
      // {
      //   source: '/blog/:slug',
      //   destination: '/sobre',
      //   permanent: true,
      // },
    ];
  },
  images: {
    domains: ['lafoca.s3.amazonaws.com'],
    unoptimized: true
  },
  reactStrictMode: false
};

  