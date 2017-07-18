const path = require('path')
const webpack = require('webpack') //to access built-in plugins
const fs = require('fs')
const extractPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModulePlugins = [
  new webpack.optimize.UglifyJsPlugin({
       compress: {
           warnings: false
       }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name:"commons",
    filename:"common/common.js",
    minChunks:2,
    chunks:["index","detail"]
  }),
  new extractPlugin({
      filename: "[name]/[name].css"
  })
]
function getEntry() {
    let jsPath = path.resolve(__dirname, 'src/js/app')
    let dirs = fs.readdirSync(jsPath)
    let matchs = [], files = {},htmls = []
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/)
        if (matchs) {
            files[matchs[1]] = path.resolve(__dirname, 'src/js/app', item)
            htmls.push(new HtmlWebpackPlugin({
                title:  matchs[1],
                filename: matchs[1]+"/"+matchs[1]+'.html'
            }))
        }
    })
    return {
      entry: files,
      htmls: htmls
    }
}
module.exports = {
    entry: getEntry().entry,
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
              use: [{
                  loader: "css-loader",
                  options: {
                    minimize: true
                  }
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
              limit: 10000
            }
          }
        ]
    },
    plugins: ModulePlugins
}
