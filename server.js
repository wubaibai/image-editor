const express = require('express');
const webpack = require('webpack');
const open = require('open');
const config = require('./webpack.config.js');

const app = express();
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
	require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
	}),
);

app.use(
	require('webpack-hot-middleware')(compiler, {
		noInfo: true,
	}),
);

// Serve the files on port 3000.
const port = 3000;
app.listen(3000, err => {
	if (err) {
		return console.error(err);
	}

	console.info(`Example app listening on port ${port}!\n`);
	open(`http://localhost:${port}`);

	return true;
});
