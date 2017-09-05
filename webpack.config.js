// TODO: Separacion dispositivos
// TODO: Estructura SASS dentro de cada specific

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Base params
// Entry path
let entryFile = 'index.jsx';
let entryPath = 'src/shop/';

// Output path
let outputPath = 'C:/eb/workspaces/mango/DEV_PIUR-16_LandingMangoCard/WebRoot/static/specifics/mangoCard/js/';
// let outputPath = 'build/';
let outputFile = 'mangoCard.js';

// Extract SASS and convert to CSS file
// Output the CSS into a different file
const extractSass = new ExtractTextPlugin({
  filename: '../css/styles.css',
  // filename: '../build/styles.css',
});

module.exports = {
  entry: path.resolve(entryPath, entryFile),

  output: {
    filename: outputFile,
    path: path.resolve(outputPath),
    // path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      // SCSS
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },

      // JS
      {
        test: /\.(js|jsx)$/, // include .jsx files
        exclude: [/node_modules/], // exclude any and all files in the node_modules folder
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                'es2015',
                'react',
              ],
            },
          },
        ],
      },

      // ESLINT
      {
        test: /\.(js|jsx)$/, // include .jsx files
        exclude: /nodes_modules/,
        loader: 'eslint-loader',
      },

      // SASS-LINT
      {
        test: /\.scss$/,
        exclude: /node-modules/,
        loader: 'sasslint-loader',
      },
    ],
  },

  plugins: [
    extractSass,
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  watch: true,
  devtool: 'source-map',
};
