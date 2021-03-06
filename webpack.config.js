const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    path.resolve(__dirname, 'app', 'index.jsx')
  ],

  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    root: __dirname,
    extensions: ['.js', '.jsx', '']
  },

  devtool: production ? 'source-map' : 'eval-source-map',

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],

    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.png|.gif$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'postcss', 'sass']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app', 'index.ejs')
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  postcss: function postcss() {
    return [autoprefixer({
      browsers: ['last 3 versions']
    })];
  }
};
