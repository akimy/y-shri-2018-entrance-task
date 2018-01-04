const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: { path: `${__dirname}/public`, filename: 'bundle.js' },
  watch: env === 'development',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            publicPath: '/public',
          })
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {       
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[hash].[ext]',
        }
      },
      {       
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          publicPath: '',
          name: 'fonts/[name].[ext]',
        }
      },
    ],
  },
  plugins: [
      new ExtractTextPlugin({
        filename: 'styles.css',
      }),
    ],
};
