/* eslint-disable @typescript-eslint/no-var-requires */
import defaultConfig from './webpack.config';
import webpack from 'webpack';
import nodemonPlugin from 'nodemon-webpack-plugin';
import path from 'path';
import { merge } from 'webpack-merge';
import DotEnv from 'dotenv-webpack';

// root path
const rootPath = path.resolve(__dirname, '../');

// dot env 설정
const dotEnvPath = path.resolve(rootPath, 'config/.env.dev');

const config: webpack.Configuration = merge(defaultConfig, {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    ignored: ['**/node_modules', '**/dist'],
    poll: 1000,
  },
  plugins: [
    ...(defaultConfig.plugins || []),
    new DotEnv({
      path: dotEnvPath,
    }),
    new nodemonPlugin({
      watch: [path.resolve(rootPath, 'dist')],
      script: path.resolve(rootPath, 'dist/server.js'),
    }),
  ],
});

export default config;
