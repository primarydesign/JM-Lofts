import CommonsChunk from 'webpack/lib/optimize/CommonsChunkPlugin';
import path from 'path';

module.exports = {
  devtool: 'source-map',
  plugins: [ new CommonsChunk('common.js')],
  resolve: {
    root: [path.join(__dirname, 'node_modules')],
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
}
