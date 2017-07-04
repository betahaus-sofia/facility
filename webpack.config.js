const autoprefixer = require('autoprefixer');
const path = require('path');
const env = require('var');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (options = {}) => ({
  devtool: options.production ? false : 'inline-source-map',
  context: process.cwd(),
  entry: {
    app: './src/app.ts',
    'service-worker': './src/service-worker.ts'
  },
  output: {
    publicPath: '/',
    path: path.resolve('./build'),
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].js.map'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss']
  },
  module: {
    rules: [
      // TypeScript
      { test: /\.tsx?$/, loader: 'ts-loader' },

      // Styles
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },

      // Assets
      {
        test: /\.(jpe?g|ico|gif|png|svg|wav|mp3|json)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [
          autoprefixer({ browsers: ['last 3 versions', '> 1%'] })
        ]
      }
    }),
    new HtmlWebpackPlugin({ template: './src/index.ejs' })
  ]
});
