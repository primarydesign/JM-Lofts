import CommonsChunk from 'webpack/lib/optimize/CommonsChunkPlugin';
import webpack from 'webpack';
import path from 'path';

module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
  //     comments: false,
      compress: {
  //       sequences: true,
  //       properties: true,
  //       dead_code: false,
  //       drop_debugger: false,
  //       unsafe: false,
  //       conditionals: false,
  //       comparisons: false,
  //       evaluate: false,
  //       booleans: false,
  //       loops: true,
  //       unused: true,
  //       hoist_funs: true,
  //       hoist_vars: false,
  //       if_return: true,
  //       join_vars: true,
  //       cascade: false,
        warnings: false
  //       negate_iife: false,
  //       pure_getters: false,
  //       pure_funcs: null,
  //       drop_console: true,
  //       keep_fargs: true,
  //       keep_fnames: false,
      }
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    })
  ],
  resolve: {
    root: [path.join(__dirname, 'node_modules')],
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.json$/, exclude: /node_modules/, loader: "json-loader" }
    ]
  }
}
