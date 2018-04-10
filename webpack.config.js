const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const rtlConfig = require('./webpack/rtl.config');
const specificsName = require('./config').BUILD_SPECIFICS_NAME;

module.exports = (env) => {
  // Entry path
  const entryPath = `src/${env.context}/${env.device}/`;
  const entryFile = 'index.jsx';

  // Output path
  const outputPath = `dist/${env.context}/${env.device}/`;
  const outputFile = 'main.js';

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
    plugins: ((plugins) => {
      plugins.push(
        extractSass,
        new WebpackRTLPlugin(rtlConfig()),
        new SassLintPlugin({
          configFile: '.sass-lint.yml',
          context: [`./style/${env.context}/${env.device}/${specificsName}`],
        }),
      );

      if (env.analyzer) {
        plugins.push(new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: path.join(__dirname, './analyzer/report.html'),
        }));
      }

      return plugins;
    })([]),
    resolve: {
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
    watch: false,
  };
};
