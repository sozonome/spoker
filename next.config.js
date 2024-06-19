const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  sentry: {
    hideSourceMaps: true,
  },
  redirects: async () => [
    {
      source: '/intro',
      destination: '/home',
      permanent: true,
    },
  ],
};

module.exports = withSentryConfig(moduleExports, {
  silent: true,
  hideSourceMaps: true,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
});
