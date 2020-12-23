// using this node js tool for hard drive path solution (macOS WinOS both)
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const babelLoaderOptions = require('./babel.config');

const config = {
	mode: 'development',
	// Generate source map for debugging
	devtool: 'cheap-module-source-map',
	// Relative Path to project directory
	entry: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './src/index.js'],
	// Relative to hard drive directory
	output: {
		// __dirname 是 node js 保留字就是該專案資料夾。
		// 意思是在這個專案資料夾下的 _public folder 建立 bundle.js 檔案作為 output
		path: path.resolve(__dirname, '_public'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelLoaderOptions,
				},
			},
			{
				test: /\.css$/,
				include: path.join(__dirname, 'src'),
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								exportLocalsConvention: 'camelCase',
								localIdentName: '[name]__[local]___[hash:base64:5]',
							},
							importLoaders: 1,
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									'postcss-import',
									[
										'postcss-preset-env',
										{
											stage: 0,
											preserve: false,
										},
									],
								],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
};

module.exports = config;
