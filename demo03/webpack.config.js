const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: path.join(__dirname, 'build', 'entry.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
        ]
    }
};