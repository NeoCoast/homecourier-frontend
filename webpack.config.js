/* eslint-disable node/no-unpublished-require, global-require */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const aliases = require('./build-utils/aliases');
const presetConfig = require('./build-utils/loadPresets');
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
/* eslint-enable */

module.exports = ({
  mode = 'production',
  presets = ['babel', 'css', 'scss', 'svg'],
}) => (
  webpackMerge(
    {
      mode,
      entry: {
        'src/index.jsx': [
          path.join(__dirname, './src/index.jsx'),
        ],
      },
      resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: aliases,
      },
      output: {
        path: path.resolve('dist'),
        publicPath: mode === 'production' ? './' : '/',
        filename: 'bundle.[hash].js',
        chunkFilename: '[name].lazy-chunk.js',
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true, // Inject all files that are generated by webpack
          template: './public/index.html',
        }),
        new webpack.ProgressPlugin(),
      ],
    },
    modeConfig(mode),
    presetConfig({ mode, presets }),
  )
);
