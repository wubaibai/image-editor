// using this node js tool for hard drive path solution (macOS WinOS both)
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    // Relative Path to project directory
    entry: './src/index.js',
    // Relative to hard drive directory
    output: {
        // __dirname 是 node js 保留字就是該專案資料夾。
        // 意思是在這個專案資料夾下的 build folder 建立 bundle.js 檔案作為 output
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};

module.exports = config;
