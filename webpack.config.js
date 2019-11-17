const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, './dist'),
        //filename: "./main.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        compress: true,
        port: 9000,
        hot: true,
        watchContentBase: true,
        progress: true
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: ['css-loader', 'resolve-url-loader', 'sass-loader']
                })
            },
            {
                test: /.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images/'
                    }
                }]
            },

            {
                test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('style.css?[hash]'),
        new CopyPlugin([
            {from: 'src/assets', to: 'assets', toType: 'dir'}
        ]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css?[hash]'
        })
    ],
    optimization: {
        minimize: false
    }
};
