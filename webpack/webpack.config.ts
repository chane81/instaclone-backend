/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import TerserPlugin from 'terser-webpack-plugin';

const rootPath = path.resolve(__dirname, '../');

const config: webpack.Configuration = {
  devtool: false,
  entry: path.resolve(rootPath, 'src/server.ts'),
  watchOptions: {
    aggregateTimeout: 600,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(rootPath, 'src'), 'node_modules'],
    alias: {
      '~/config': path.resolve(rootPath, 'config'),
      '~/src': path.resolve(rootPath, 'src'),
      '~/entity': path.resolve(rootPath, 'src/graphql/entity'),
      '~/utils': path.resolve(rootPath, 'src/utils'),
      '~/repo': path.resolve(rootPath, 'src/repo'),
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: true,
          keep_classnames: true,
        },
      }),
    ],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(rootPath, 'dist'),
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /uws/,
    }),
  ],
  resolveLoader: {
    modules: ['./node_modules'],
  },
};

export default config;
