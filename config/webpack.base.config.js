const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const APP_DIR = path.resolve(__dirname, '../src')

module.exports = env => {
	const { PLATFORM, VERSION } = env
	return merge([
		{
			entry: ['@babel/polyfill', APP_DIR],
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader'
						}
					},
					{
						test: /\.css$/,
						use: [
							PLATFORM === 'production'
								? MiniCssExtractPlugin.loader
								: 'style-loader',
							'css-loader'
						]
					},
					{
						test: /\.scss$/,
						use: [
							PLATFORM === 'production'
								? MiniCssExtractPlugin.loader
								: 'style-loader',
							'css-loader',
							'sass-loader'
						]
					},
					{
						test: /\.less$/,
						use: [
							{
								loader:
									PLATFORM === 'production'
										? MiniCssExtractPlugin.loader
										: 'style-loader'
							},
							{
								loader: 'css-loader'
							},
							{
								loader: 'less-loader',
								options: {
									javascriptEnabled: true
								}
							}
						]
					}
				]
			},
			plugins: [
				new CleanWebpackPlugin(['dist']),
				new HtmlWebpackPlugin({
					template: './src/index.html',
					filename: './index.html'
				}),
				new webpack.DefinePlugin({
					'process.env.VERSION': JSON.stringify(env.VERSION),
					'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
				}),
				new CopyWebpackPlugin([{ from: 'src/static' }]),
				new webpack.HashedModuleIdsPlugin()
			],
			output: {
				filename: process.env.production
					? '[name].bundle.[contenthash].js'
					: '[name].bundle.js',
				chunkFilename: process.env.production
					? '[name].chunk.bundle.[contenthash].js'
					: '[name].chunk.bundle.js',
				path: path.resolve(__dirname, '..', 'dist'),
				publicPath: '/'
			}
		}
	])
}
