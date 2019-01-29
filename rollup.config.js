import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import clone from 'clone'
import replace from 'rollup-plugin-replace'

let browserConfig = {
  input: 'index.js',
  output: {
    file: 'dist/react-rimple.browser.js',
    format: 'iife',
    name: 'reactRimple',
    sourcemap: true,
    globals: {
      react: 'React'
    }
  },
  plugins: [
    // https://github.com/rollup/rollup/issues/487
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel(),
    resolve(),
    commonjs()
  ],
  // NOTE, only react is external
  external: ['react', 'prop-types']
}

let browserMinConfig = clone(browserConfig)
browserMinConfig.output.file = 'dist/react-rimple.browser.min.js'
browserMinConfig.plugins.push(uglify())

export default [
  {
    input: 'index.js',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
    plugins: [ babel() ],
    external: ['react', 'prop-types', 'hoist-non-react-statics']
  },
  {
    input: 'index.js',
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [ babel() ],
    external: ['react', 'prop-types', 'hoist-non-react-statics']
  },
  browserConfig,
  browserMinConfig
]
