module.exports = () => ({
  module: {
    rules: [
      {
        loader: 'file-loader',
        test: /\.(png|jpe?g|gif|webp)$/i,
      },
    ],
  },
});
