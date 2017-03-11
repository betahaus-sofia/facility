const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: process.cwd(),
  entry: {
    facility: './src/facility.ts'
  },
  output: {
    publicPath: '/',
    path: path.resolve('./build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss']
  },
  module: {
    rules: [
      // TypeScript
      { test: /\.tsx?$/, loader: 'ts-loader' },

      // SASS
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
