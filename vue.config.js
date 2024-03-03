const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const isPackage = process.env.TYPE === 'package'
const isTheme = process.env.TYPE === 'theme'
const isDev = !isPackage && !isTheme

module.exports = {
  chainWebpack(config) {
    if(isDev) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }
    config.plugin('circular').use(new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      // failOnError: true, // 为true的话只要监测到循环引用编译直接抛错
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }))
  }
}