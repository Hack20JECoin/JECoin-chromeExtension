var config, path, webpack;

path = require('path');
webpack = require('webpack');

config = {
  entry : {
    script: './extension.js'
  },
  output: {
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
            presets: ['env']
        }
      }
    ]
  }
};

module.exports = config;
