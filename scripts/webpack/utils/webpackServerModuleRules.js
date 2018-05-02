
const path = require('path')

module.exports = function webpackServerModuleRules(dev, name) {
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
      include: [path.resolve('./packages')],
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: false,
            presets: [
              [require.resolve('@babel/preset-env'), {
                targets: {
                  node: 'current'
                }
              }]
            ],
            plugins: [
              [require.resolve('babel-plugin-styled-components'), {
                ssr: true
              }],
              require.resolve('@babel/plugin-transform-runtime'),
              require.resolve('@babel/plugin-proposal-object-rest-spread'),
              require.resolve('@babel/plugin-proposal-class-properties'),
              require.resolve('@babel/plugin-syntax-dynamic-import'),
              require.resolve('react-hot-loader/babel')
            ]
          }
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
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
