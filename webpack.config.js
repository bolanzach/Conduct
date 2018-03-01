const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

// module.exports = {
//   entry: ['./src/core/conductEngine.ts', './src/game.ts'],
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
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var serverConfig = {
  entry: ['./src/core/network/server.ts'],
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
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: path.resolve(__dirname, './src/client') }
    ]
  },
  externals: nodeModules
};

var clientConfig = {
  entry: ['./src/core/conductEngine.ts', './src/game.ts'],
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
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: path.resolve(__dirname, './src/server')
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};

// module.exports = [serverConfig, clientConfig];
module.exports = [clientConfig];