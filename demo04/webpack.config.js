let path = require('path');

module.exports = function (env) {
    let cooked = (JSON.parse(process.env['npm_config_argv']) || {})['cooked'];
    let [action = '', type = '', name = '', entry = 'entry'] = cooked.map((a) => a.replace(/-/g, ''));
    let options;
    if(action !== 'run') throw new Error('[Error] Please configure scripts!');

    console.log('[Build] ' + name);

    switch (name) {
        default:
            options = {
                entry: path.join(__dirname, name, entry),
                output: {
                    path: path.join(__dirname, name),
                    filename: "bundle.js"
                },
                module: {
                    loaders: [
                        {test: /\.css$/, loader: 'style-loader!css-loader'},
                        {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
                    ]
                }
            };
            break;
    }
    if (!options) {
        throw new Error('[NotFind] ' + name);
    } else {
        if (type === 'dev') {
            options.devServer = {
                contentBase: path.join(__dirname, name, 'dist'),
                port: 80,
                inline: true
            }
        } else {
            options.devtool = 'source-map'; //生成source-map, 便于调试
        }
    }
    return options;
};