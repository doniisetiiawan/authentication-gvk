const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'source-map',
  // Entry Point
  entry: {
    app: './src/index.js',
  },
  // Output
  output: {
    path: path.resolve(`${__dirname}/dist`),
    filename: 'app.bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  // webpack dev server
  devServer: {
    compress: true,
    port: 3000,
    stats: 'errors-only',
    open: true,
  },
  // Loader
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
        ][('css-loader', 'sass-loader')],
      },
      {
        // For images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            // Using File-loader for these files
            loader: 'file-loader',
            /* In options we can set different things like format
             and directory to save */
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        // For fonts
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // using file-loader too
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  // plugin
  plugins: [
    new Dotenv(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist'],
    }),
  ],
};
