const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
require('dotenv').config();

// Dotenv configuration
const envPath = (fs.existsSync('.env')) ? '.env' : '.env.default';
require('dotenv').config({ path: envPath });

module.exports = () => {
  // Specifics name
  const specificsName = process.env.BUILD_SPECIFICS_NAME;

  // Entry path
  const entryPath = path.join('src', specificsName);
  const entryFile = 'index.js';

  // Output path
  const outputPath = path.join('dist', specificsName);
  const outputFile = 'main.js';

  // Extract SASS and convert to CSS file
  // Output the CSS into a different file
  const extractSass = new ExtractTextPlugin({
    filename: 'styles.css',
  });

  return {
    entry: {
      [specificsName]: path.join(__dirname, entryPath, entryFile),
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      open: true,
      openPage: 'index.html',
      disableHostCheck: true,
      historyApiFallback: true,
    },
    output: {
      filename: outputFile,
      path: path.resolve(__dirname, outputPath),
    },
    module: {
      rules: [
        // SCSS
        {
          test: /\.(css|scss)$/,
          use: extractSass.extract({
            use: [
              { loader: 'css-loader' },
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
          loader: 'babel-loader',
        },
        // ESLINT
        {
          test: /\.(js|jsx)$/, // include .jsx files
          exclude: /nodes_modules/,
          loader: 'eslint-loader',
        },
      ],
    },
    plugins: (() => {
      const plugins = [
        extractSass,
        new Dotenv({
          path: envPath,
          safe: false,
          silent: true,
        })
      ];
      return plugins;
    })(),
    resolve: {
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
    watch: false,
  };
};
