const common = require('./webpack.base.js');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
    devtool: 'eval',
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        compress: true,
        clientLogLevel: 'none',
        host: '127.0.0.1',
        allowedHosts: ['127.0.0.1:23232'],
        port: 23232,
        proxy: {
            '/': {
                target: 'http://127.0.0.1:23232',
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/'
                }
            }
        }
    },
    output: {
        filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
        path: path.resolve(__dirname, './')
    },
    module: {},
    mode: 'development'
});
