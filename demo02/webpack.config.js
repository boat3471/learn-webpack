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
            {test: /\.css$/, loader: 'style-loader!css-loader'},
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 80,
        inline: true
    }
};