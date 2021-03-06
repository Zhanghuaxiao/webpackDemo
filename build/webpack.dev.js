const webpack = require('webpack');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: "development",
    devtool: "cheap-source-map",
    devServer: {
        contentBase: '/dist',
        open: true,
        proxy: {
            '/api': 'http://localhost:3000'
        },
        hot: true,
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()  // 热模块更新 HMR 功能
    ],
    optimization: {
        usedExports: true
    },
    stats: {
        colors: true
    }
}

module.exports = merge(commonConfig, devConfig)