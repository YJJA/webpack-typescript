
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = function webpackServerPlugins(dev, name) {
  let plugins = [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: require.resolve('../../../tsconfig.json')
    }),
    new webpack.DefinePlugin({
      'process.env.RUNTIME_ENV': JSON.stringify('server'),
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production')
    })
    // ,
    // new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ]

  if (dev) {
    plugins = [
      ...plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  }

  return plugins
}
