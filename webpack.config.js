const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: { path: `${__dirname}/public`, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: env === 'production'
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
            publicPath: '/public',
          })
          : ['style-loader', 'css-loader'],
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  plugins: env === 'production'
    ? [
      new ExtractTextPlugin({
        filename: 'styles.css',
      }),
    ]
    : [],
};
