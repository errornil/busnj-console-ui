const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const cssLoaders = ({ isProd = false }) => {
  return {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader' // creates style nodes from JS strings
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          modules: true,
          importLoaders: 3,
          sourceMap: true,
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader', // applies auto-prefixing
        options: {
          ident: 'postcss',
          plugins: () => [
            autoprefixer({
              browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
              flexbox: 'no-2009'
            })
          ],
          sourceMap: true
        }
      },
      {
        loader: 'resolve-url-loader', // resolves relative paths in url
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader', // compiles Sass to CSS
        options: {
          sourceMap: true
        }
      }
    ]
  };
};

module.exports = cssLoaders;
