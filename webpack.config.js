const path = require('path')
const webpack = require('webpack') //to access built-in plugins
const fs = require('fs')
function getEntry() {
    let jsPath = path.resolve(__dirname, 'src/js/app')
    let dirs = fs.readdirSync(jsPath)
    let matchs = [], files = {}
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(__dirname, 'src/js/app', item)
        }
    })
    return files
}
module.exports = {
    entry: getEntry(),
    output: {
      path: path.join(__dirname, "src/js/dist"), //文件输出目录
      publicPath: "src/js/dist",        //用于配置文件发布路径，如CDN或本地服务器
      filename: "[name].js",        //根据入口文件输出的对应多个文件名
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                include: __dirname + '/src/js'
            }
        ]
    },
    plugins: [
        //js文件的压缩
        new webpack.optimize.UglifyJsPlugin({
             compress: {
                 warnings: false
             }
         })
    ]
}
