// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';

import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  dva: {
    hmr: true,
  },
  targets: {
    ie: 11,
  },
  routes,
  esbuild: {},
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  fastRefresh: {}
});
