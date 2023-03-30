// 因为打包需要使用node，所以才需要使用commonJS的写法
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  }
}