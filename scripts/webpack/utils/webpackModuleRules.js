
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function (dev, name) {
  return [
    {
      test: /\.tsx?$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      include: [path.resolve('./packages')],
      exclude: /node_modules/,
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      include: [path.resolve('./packages')],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: dev ? 1024 * 100 : 1024 * 8,
        name: `static/images/[name]${dev ? '' : '.[hash:8]'}.[ext]`
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: dev ? 1024 * 100 : 1024 * 8,
        name: `static/fonts/[name]${dev ? '' : '.[hash:8]'}.[ext]`
      }
    }
  ]
}
