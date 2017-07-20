const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH_ROOT = path.resolve(__dirname);
const PATH_APP = path.resolve(__dirname, 'app');
const PATH_BUILD = path.resolve(__dirname, 'build');


module.exports = {
    entry: {
        app: path.resolve(PATH_APP, 'app.jsx')
    },
    output: {
        path: PATH_BUILD,
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.(js|jsx)x$/, loaders: ['babel-loader'], include: PATH_APP, exclude: /node_modules/},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'first react app'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};