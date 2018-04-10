const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const SassLintPlugin = require('sasslint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const rtlConfig = require('./webpack/rtl.config');

// Dotenv configuration
const envPath = (fs.existsSync('.env')) ? '.env' : '.env.default';
require('dotenv').config({ path: envPath });

module.exports = (env) => {
  // Entry path
  const entryPath = `src/${env.context}/${env.device}/`;
  const entryFile = 'index.jsx';

  // Output path
  const outputPath = `dist/${env.context}/${env.device}/`;
  const outputFile = 'main.js';

  // Specifics name
  const specificsName = process.env.BUILD_SPECIFICS_NAME;

  // Extract SASS and convert to CSS file
  // Output the CSS into a different file
  const extractSass = new ExtractTextPlugin({
    filename: 'styles.css',
  });

  return {
    entry: {
      [specificsName]: path.resolve(__dirname, entryPath, specificsName, entryFile),
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      open: true,
      openPage: `${specificsName}.html`,
      disableHostCheck: true,
      historyApiFallback: true,
    },
    output: {
      filename: outputFile,
      path: path.resolve(__dirname, outputPath, specificsName),
    },
    node: {
      fs: 'empty',
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
      ],
    },
    plugins: (() => {
      const plugins = [
        new SassLintPlugin({
          configFile: '.sass-lint.yml',
          context: [`./style/${env.context}/${env.device}/${specificsName}`],
        }),
        extractSass,
        new WebpackRTLPlugin(rtlConfig()),
        new Dotenv({
          path: envPath,
          safe: false,
          silent: true,
        }),
        new ProgressBarPlugin(),
      ];
      if (env.analyzer) {
        plugins.push(new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: path.join(__dirname, './analyzer/report.html'),
        }));
      }
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
