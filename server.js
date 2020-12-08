const express = require('express');
const webpack = require('webpack');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
    require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
    })
);

// Serve the files on port 3000.
app.listen(3000, err => {
	if (err) {
		return console.error(err);
    }

    console.log('Example app listening on port 3000!\n');
});
