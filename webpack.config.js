const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    entry: {
        index: './src/index.js',
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            //exclude: 'node_modules'
        }]
    },
    output: {
        path: path.resolve(__dirname, './dist'), //文件输出的路径
        filename: '[name].[chunkhash].js',
        library: '[name]_[chunkhash]'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                mangle: true, // Note `mangle.properties` is `false` by default.
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_fnames: false,
            },
            parallel: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin() //改变代码执行顺序，减少代码包裹
    ],
    devServer:{
        open:true,//打开
        port:9000,//端口
        proxy:{
            '/api/*':{
                target:'http://localhost:8800'
            }
        }
    }
}