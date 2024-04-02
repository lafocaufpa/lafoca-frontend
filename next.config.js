module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/perguntas',
        destination: '/faq',
        permanent: true,
      },
      // Wildcard path matching
      {
        source: '/blog/:slug',
        destination: '/faq/:slug',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['lafoca.s3.amazonaws.com'],
    unoptimized: true
  }
};

