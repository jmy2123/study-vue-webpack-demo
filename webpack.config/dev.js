const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./base')
const root = path.resolve(__dirname, '..') // 项目的根目录绝对路径

module.exports = merge(baseConfig, {
  entry: [
    'webpack/hot/dev-server', // 热替换处理入口文件
    path.join(root, 'src/main.js')
  ],
  devServer: {
    historyApiFallback: true, // 404的页面会自动跳转到／页面
    inline: true, // 文件改变自动刷新页面
    progress: true, // 显示编译进度
    port: 3001
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 添加热替换插件
    new HtmlWebpackPlugin({
      template: path.join(root, 'index.html'),  // 模版文件
      inject: 'body' // js的script注入到body底部
    })
  ]
})
