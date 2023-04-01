const path = require('path')

module.exports ={
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options:{
            // plugins: [
            // "@babel/plugin-transform-arrow-function",
            // "@babel/plugin-transform-block-scoping"
            // ]
            presets: [
              //添加预设
              "@babel/preset-env"
            ]
          }
        }
      }
    ]
  },
}
