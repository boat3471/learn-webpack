var path = require('path');

module.exports = function (env) {
    var argv = JSON.parse(process.env['npm_config_argv']) || {},
        cooked = argv['cooked'] || [],
        options,
        type = cooked[1] || '',
        name = cooked[2] || '',
        entry = cooked[3] || 'entry';
    name = name.replace(/-/g, '');
    entry = entry.replace(/-/g, '');

    console.log('[Build] ' + name);

    switch (name) {
        default:
            options = {
                entry: path.join(__dirname, name, 'build', entry),
                output: {
                    path: path.join(__dirname, name, 'dist'),
                    filename: "bundle.js"
                },
                module: {
                    loaders: [
                        {test: /\.css$/, loader: 'style-loader!css-loader'}
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