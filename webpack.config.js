const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './client/index.js',
  output: { path: `${__dirname}/public`, filename: 'bundle.js' },
  resolve: {extensions: ['.js','.jsx']},
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
          name: 'images/[name].[ext]',
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

if (env === 'production') {
  config.plugins.push(new UglifyJsPlugin({
    sourceMap: true,
  }));
  config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
  }));
}

module.exports = config;
