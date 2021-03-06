/**
 * Webpack config for building individual packages for distribution
 */
/* eslint no-sync:0 */

import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackBaseConfig from './webpack.base.babel';

const plugins = [
  // Setup uglify to compress and suppress warnings in logs
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    }
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];

// Only create html file when one exists in src/
if (fs.existsSync(`./src/index.html`)) {
  plugins.push(
    new HtmlWebpackPlugin({
      hash: true,
      minify: {
        collapseWhitespace: false,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true
      },
      template: `./index.html`
    })
  );
}

export default webpackBaseConfig({
  entry: `./index.js`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(process.cwd(), `dist`),
    sourceMapFilename: `[file].map`
  },
  // Full source maps for production debugging
  devtool: `source-map`,
  plugins,
  // Reset env values we don't want to see in bundles
  env: {
    CISCOSPARK_ACCESS_TOKEN: ``,
    TO_PERSON_EMAIL: ``,
    TO_PERSON_ID: ``
  }
});
