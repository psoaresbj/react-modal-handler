import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    url(),
    svgr(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    resolve({ browser: true }),
    commonjs()
  ]
};
