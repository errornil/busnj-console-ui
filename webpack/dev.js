const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common.js');
const cssLoaders = require('./loaders/cssLoaders.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'eval-source-map',

  module: {
    rules: [cssLoaders({})]
  },

  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    port: 4500,
    inline: true,
    hot: true
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  optimization: {
    usedExports: true
  }
});
