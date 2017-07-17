const path = require('path')
const webpack = require('webpack') //to access built-in plugins
const fs = require('fs')
const extractPlugin = require('extract-text-webpack-plugin')
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
const extractSass = new extractPlugin({
    filename: "[name]/[name].css"
})
module.exports = {
    entry: getEntry(),
    output: {
      path: path.join(__dirname, "src/dist/"), //文件输出目录
      publicPath: "http://www.workspace.com/webpack-demo/src/dist/",        //用于配置文件发布路径，如CDN或本地服务器
      filename: "[name]/[name].js",        //根据入口文件输出的对应多个文件名
    },
    module: {
        loaders: [
          {
              test: /\.js/,
              loader: 'babel-loader',
              include: __dirname + '/src/js'
          }
        ],
        rules: [
          {
            test: /\.scss$/,
            use: extractPlugin.extract({
              fallback: 'style-loader',
              //resolve-url-loader may be chained before sass-loader if necessary
              use: [{
                  loader: "css-loader"
              }, {
                  loader: "sass-loader",
                  options: {
                      includePaths: [__dirname+"/src/css/app",__dirname+"/src/css/base"]
                  }
              }]
            })
          },
          {
            test: /.(png|gif|jpe?g|svg)$/,
            loader: 'url-loader',
            query: {
              limit: 10240
            }
          }
        ]
    },
    plugins: [
        //js文件的压缩
        new webpack.optimize.UglifyJsPlugin({
             compress: {
                 warnings: false
             }
        }),
        extractSass
    ]
}
