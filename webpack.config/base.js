const path = require('path')
const root = path.resolve(__dirname, '..') // 项目的根目录绝对路径

module.exports = {
  entry: path.join(root, 'src/main.js'),  // 入口文件路径
  output: {
    path: path.join(root, 'dist'),  // 出口目录
    filename: 'bundle.js'  // 出口文件名
  },
  resolve: {
    alias: {
      components: path.join(root, 'src/components'),
      views: path.join(root, 'src/views'),
      styles: path.join(root, 'src/styles'),
      store: path.join(root, 'src/store')
    },
    extensions: ['.js', '.vue']
  },
  module: {
  	loaders: [
  		{
        test: /\.vue$/, 
        loader: 'vue-loader'},
  		{
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
  	]
  }
}