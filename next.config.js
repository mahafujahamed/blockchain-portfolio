module.exports = {
  webpack(config) {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
