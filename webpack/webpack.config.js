
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const terserPlugin = require('terser-webpack-plugin');
const PnpPlugin = require('pnp-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');

module.exports = {
  devtool: false,
  entry: path.resolve(rootPath, 'src/server.ts'),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /\.yarn/
      }
    ]
  },
  target: 'async-node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [PnpPlugin],
    // modules: [path.resolve(rootPath, 'src'), 'node_modules'],
    alias: {
      '~/config': path.resolve(rootPath, 'config'),
      '~/src': path.resolve(rootPath, 'src'),
      '~/entity': path.resolve(rootPath, 'src/graphql/entity'),
      '~/utils': path.resolve(rootPath, 'src/utils'),
      '~/repo': path.resolve(rootPath, 'src/repo')
    }
  },
  optimization: {
    minimizer: [
      new terserPlugin({
        parallel: true,
        terserOptions: {
          compress: true,
          ecma: 6,
          keep_classnames: true
        }
      })
    ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(rootPath, 'dist')
  },
  plugins: [new webpack.IgnorePlugin({
    resourceRegExp: /uws/,
  })],
  resolveLoader: {
    plugins: [PnpPlugin.moduleLoader(module)],
  }
};
