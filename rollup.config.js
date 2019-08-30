// rollup.config.js
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/youdao-userscript.js',
    format: 'cjs',
    banner: '// ==UserScript==\n' +
      '// @name         ' + pkg.toolName + '\n' +
      '// @namespace    rollup-react\n' +
      '// @version      ' + pkg.version + '\n' +
      '// @description  ' + pkg.description + '\n' +
      '// @author       ' + pkg.author + '\n' +
      '// @include     https://note.youdao.com/web/*\n' +
      '// @grant       unsafeWindow\n' +
      '// @grant       GM_addStyle\n' +
      '// @grant       GM_getValue\n' +
      '// @grant       GM_setValue\n' +
      '// @grant       GM_deleteValue\n' +
      '// @grant       GM_listValues\n' +
      '// ==/UserScript==\n'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    resolve(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**', // Default: undefined
      //exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
      // these values can also be regular expressions
      // include: /node_modules/

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: ['.js'], // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false, // Default: true

      // explicitly specify unresolvable named exports
      // (see below for more details)
      namedExports: {
      }, // Default: undefined

      // sometimes you have to leave require statements
      // unconverted. Pass an array containing the IDs
      // or a `id => boolean` function. Only use this
      // option if you know what you're doing!
      //ignore: [ 'conditional-runtime-dependency' ]
    })
  ]
};