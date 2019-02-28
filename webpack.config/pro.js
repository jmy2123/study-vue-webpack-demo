const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./base')
const root = path.resolve(__dirname, '..')

module.exports = merge(baseConfig, {
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(root, 'index.html'),
			inject: 'body'
		})
	]
})
