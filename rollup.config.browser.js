import babel from 'rollup-plugin-babel'

export default {
  input: 'index.js',
  output: {
    file: 'build/react-rimple.browser.js',
    format: 'iife',
    name: 'reactRimple',
    sourcemap: true,
    globals: {
      react: 'React'
    }
  },
  plugins: [
    babel()
  ],
  external: ['react']
}
