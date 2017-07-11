const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm
const webpack = require('webpack') //to access built-in plugins
const fs = require('fs')
function getEntry() {
    var jsPath = path.resolve(__dirname, 'app')
    var dirs = fs.readdirSync(jsPath)
    var matchs = [], files = {}
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(__dirname, 'app', item)
        }
    });
    return files
}
module.exports = {
    devtool: "source-map",    //生成sourcemap,便于开发调试
    entry: getEntry(),
    output: {
      path: path.join(__dirname, "dist/"), //文件输出目录
      publicPath: "dist/",        //用于配置文件发布路径，如CDN或本地服务器
      filename: "[name].js",        //根据入口文件输出的对应多个文件名
    },
    devServer: {
        hot: true,
    },
    module: {
      rules: [
        { test: /\.css/, use: 'css-loader' },
        { test: /\.ts/, use: 'ts-loader' },
        { test: /\.(js|jsx)$/,use: 'babel-loader'}
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
             compress: {
                 warnings: false
             }
         }),
      new HtmlWebpackPlugin({template: './index.html'})
    ]
}
