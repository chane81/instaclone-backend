/* eslint-disable @typescript-eslint/no-var-requires */
import { merge } from 'webpack-merge';
import webpack from 'webpack';
import defaultConfig from './webpack.config';
import path from 'path';
import DotEnv from 'dotenv-webpack';

// root path
const rootPath = path.resolve(__dirname, '../');

// dot env 설정
const dotEnvPath = path.resolve(rootPath, 'config/.env.prod');

const config: webpack.Configuration = merge(defaultConfig, {
  mode: 'production',
  plugins: [
    ...(defaultConfig.plugins || []),
    new DotEnv({
      path: dotEnvPath,
    }),
  ],
});

export default config;
