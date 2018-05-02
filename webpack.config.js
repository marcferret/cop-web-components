const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const SassLintPlugin = require('sasslint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const rtlConfig = require('./webpack/rtl.config');

// Dotenv configuration
const envPath = (fs.existsSync('.env')) ? '.env' : '.env.default';
require('dotenv').config({ path: envPath });

module.exports = (env) => {
  // Specifics name
  const specificsName = process.env.BUILD_SPECIFICS_NAME;

  // Entry path
  const entryPath = path.join('src', env.context, env.device, specificsName);
  const entryFile = 'index.jsx';

  // Output path
  const outputPath = path.join('dist', env.context, env.device, specificsName);
  const outputFile = 'main.js';

  // Clean path
  const cleanPath = path.join('dist', env.context, env.device, specificsName);

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
      contentBase: path.join(__dirname, 'public'),
      open: true,
      openPage: `${specificsName}.html`,
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
        new SassLintPlugin({
          configFile: '.sass-lint.yml',
          context: [path.join(__dirname, 'style', env.context, env.device, specificsName)],
        }),
        extractSass,
        new WebpackRTLPlugin(rtlConfig()),
        new Dotenv({
          path: envPath,
          safe: false,
          silent: true,
        }),
        new CleanWebpackPlugin([cleanPath], {
          beforeEmit: true,
          verbose: false,
        }),
        new ProgressBarPlugin(),
      ];
      if (env.analyzer) {
        plugins.push(new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: path.join(__dirname, 'analyzer', 'report.html'),
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
