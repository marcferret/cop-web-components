const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const rtlConfig = require('./webpack/rtl.config');
const branchName = require('./webpack/branchName');

module.exports = () => {
  // Base params
  // Entry path
  const entryPath = 'src/';
  const entryFile = 'index.jsx';

  // Output path
  const outputPath = `C:\\eb\\workspaces\\mango\\${branchName}\\WebRoot\\app\\shop\\TO-BE_DEFINED`;
  const outputFile = 'main.js';

  // Extract SASS and convert to CSS file
  // Output the CSS into a different file
  const extractSass = new ExtractTextPlugin({
    filename: 'styles.css',
  });

  return {
    entry: path.resolve(entryPath, entryFile),
    devtool: 'inline-source-map',
    devServer: {
      disableHostCheck: true,
    },
    output: {
      filename: outputFile,
      path: path.resolve(__dirname, outputPath),
    },
    module: {
      rules: [
        // SCSS
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: [
              { loader: 'css-loader' },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: './webpack/postcss.config.js',
                  },
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  includePaths: ['node_modules'],
                },
              },
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
                  'env',
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
      new WebpackRTLPlugin(rtlConfig()),
    ],
    resolve: {
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
    watch: false,
  };
};
