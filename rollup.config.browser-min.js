import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'index.js',
  output: {
    file: 'build/react-rimple.browser.min.js',
    format: 'iife',
    name: 'reactRimple',
    sourcemap: true,
    globals: {
      react: 'React'
    }
  },
  plugins: [
    babel(),
    uglify()
  ],
  external: ['react']
}
