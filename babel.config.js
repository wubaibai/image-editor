module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				useBuiltIns: 'usage',
				corejs: 3,
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-react',
	],
	plugins: [
		'react-hot-loader/babel',
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					components: './src/components',
					routes: './src/routes',
					actions: './src/actions',
					reducers: './src/reducers',
					store: './src/store',
					utils: './src/utils',
				},
			},
		],
	],
};
