const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'app', 'index.jsx') 
  ],

  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    root: __dirname,
    extensions: ['.js', '.jsx', '']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      },
      {
        test: /\.png$/,
        exclude: '/node_modules/',
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        exclude: '/node_modules/',
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app', 'index.ejs')
    })
  ]
};
