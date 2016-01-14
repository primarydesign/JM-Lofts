import CommonsChunk from 'webpack/lib/optimize/CommonsChunkPlugin';
import path from 'path';

module.exports = {
  devtool: 'source-map',
  plugins: [ new CommonsChunk('common.js')],
  resolve: {
    root: [path.join(__dirname, 'node_modules')],
  },
  output: {
    filename: '[name].chunk.js',
    sourceMapFilename: '[name].map'
  }
}
