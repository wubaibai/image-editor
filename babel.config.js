module.exports = {
	presets: ['@babel/preset-env', '@babel/preset-react'],
	plugins: [
		'react-hot-loader/babel',
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					components: './src/components',
					routes: './src/route',
				},
			},
		],
	],
};
