module.exports = () => ({
  devServer: {
    historyApiFallback: true,
    watchOptions: {
      poll: true,
      ignored: '/node_modules/',
    },
  },
});
