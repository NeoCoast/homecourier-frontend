module.exports = () => ({
  module: {
    rules: [
      {
        loader: ['@svgr/webpack', 'url-loader?limit=10000&mimetype=image/svg+xml'],
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      },
    ],
  },
});
