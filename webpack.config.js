const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');
const rtlConfig = require('./webpack/rtl.config');
require('dotenv').config();

module.exports = (env) => {
  // ENV Params
  const branchName = process.env.BRANCH_NAME || 'RELEASE_INT';
  const specificsName = process.env.SPECIFICS_NAME || 'home';
  const pathWorkspaces = process.env.PATH_WORKSPACES || 'C:/eb/workspaces/mango/';

  // Base params
  // Entry path
  const entryPath = `src/${env.context}/${env.device}/`;
  const entryFile = 'index.jsx';

  // Output path
  const outputPath = `${pathWorkspaces}${branchName}/WebRoot/app/${env.context}/${env.device}/${specificsName}`;
  const outputFile = 'main.js';

  // Extract SASS and convert to CSS file
  // Output the CSS into a different file
  const extractSass = new ExtractTextPlugin({
    filename: 'styles.css',
  });

  const getPlugins = () => {
    const plugins = [
      extractSass,
      new WebpackRTLPlugin(rtlConfig()),
      new Dotenv({
        safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
      }),
      new SassLintPlugin({
        configFile: '.sass-lint.yml',
        context: ['./style'],
      }),
    ];

    if (env.analyzer) {
      plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
  };

  return {
    entry: path.resolve(entryPath, process.env.SPECIFICS_NAME, entryFile),
    devtool: (process.env.NODE_ENV === 'production') ? 'none' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      openPage: `${process.env.SPECIFICS_NAME}.html`,
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
    plugins: getPlugins(),
    resolve: {
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
    watch: false,
  };
};
