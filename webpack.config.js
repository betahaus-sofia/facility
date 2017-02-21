const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: process.cwd(),
  entry: {
    facility: './build/src/facility.js'
  },
  output: {
    publicPath: '/',
    path: path.resolve('./build'),
    filename: '[name].js'
  }
};
