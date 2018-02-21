const path = require('path');
const webpack = require('webpack');

// module.exports = {
//   entry: ['./src/core/engine.ts', './src/game.ts'],
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   resolve: {
//     extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
//   },
//   devtool: "source-map",
//   target: 'node',
//   module: {
//     loaders: [
//       { test: /\.tsx?$/, loader: "ts-loader" }
//     ]
//   }
// };

var serverConfig = {
  entry: ['./src/core/engine.ts', './src/game.ts'],
  output: {
    filename: 'bundle.node.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  devtool: "source-map",
  target: 'node',
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};

var clientConfig = {
  entry: ['./src/core/engine.ts', './src/game.ts'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  devtool: "source-map",
  target: 'web',
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};

module.exports = [serverConfig, clientConfig];