import CommonsChunk from 'webpack/lib/optimize/CommonsChunkPlugin';
import webpack from 'webpack';
import path from 'path';

module.exports = {
  devtool: 'source-map',
  plugins: [
    new CommonsChunk('common.js'),
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
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
