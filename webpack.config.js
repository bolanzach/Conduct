const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var serverConfig = {
  entry: ['./src/game.ts'], // './src/core/conductEngine.ts'
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
  externals: nodeModules,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        CLIENT: JSON.stringify(false),
        SERVER: JSON.stringify(true)
      }
    })
  ]
};

var clientConfig = {
  entry: ['./src/game.ts'], // './src/core/conductEngine.ts'
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
        loader: "ts-loader"
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        CLIENT: JSON.stringify(true),
        SERVER: JSON.stringify(false)
      }
    })
  ]
};

module.exports = [serverConfig, clientConfig];