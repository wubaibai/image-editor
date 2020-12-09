// using this node js tool for hard drive path solution (macOS WinOS both)
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode: 'development',
    // Generate source map for debugging
    devtool: 'cheap-module-source-map',
    // Relative Path to project directory
    entry: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './src/index.js'],
    // Relative to hard drive directory
    output: {
        // __dirname 是 node js 保留字就是該專案資料夾。
        // 意思是在這個專案資料夾下的 build folder 建立 bundle.js 檔案作為 output
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
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
                            '@babel/preset-react',
                        ],
                        plugins: [
                            'react-hot-loader/babel',
                            [
                                'module-resolver', {
                                    root: ['./src'],
                                    alias: {
                                        components: './src/components',
                                        routes: './src/routes',
                                    }
                                }
                            ],
                        ]
                    }
                }
            }
        ]
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
