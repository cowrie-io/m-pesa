const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

const rootDir = path.resolve(__dirname, '..');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        publicPath: 'dist/',
        path: rootDir + '/dist/',
        filename: 'index.js',
        library: 'Mpesa',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this',
    },
});
