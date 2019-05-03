const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./common.js');
const cssLoaders = require('./loaders/cssLoaders.js');

module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  module: {
    rules: [cssLoaders({ isProd: true })]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: false,
        parallel: false,
        sourceMap: true // JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
