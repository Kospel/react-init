/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlgin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './root/index.tsx',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules/'),
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules')],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      styles: path.resolve(__dirname, 'root/styles'),
      routing: path.resolve(__dirname, 'root/routing'),
      pages: path.resolve(__dirname, 'root/pages'),
    },
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'root/'),
    port: 3000,
    hotOnly: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlgin({
      template: 'root/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFileName: '[id].css',
    }),
  ],
};
