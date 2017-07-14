const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
function getEntry() {
    let jsPath = path.resolve(__dirname, 'src/css/app');
    let dirs = fs.readdirSync(jsPath);
    let matchs = [], files = {}
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.scss$/);
        if (matchs) {
          files[matchs[1]] = path.resolve(__dirname, 'src/css/app', item)
        }
    })
    console.log(files)
    return files
}
module.exports = {
  entry: getEntry(),
  output: {
    path: path.join(__dirname, "src/css/dist"), //文件输出目录
    publicPath: "src/css/dist",        //用于配置文件发布路径，如CDN或本地服务器
    filename: "[name].css",        //根据入口文件输出的对应多个文件名
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        //resolve-url-loader may be chained before sass-loader if necessary
        use: ['css-loader', 'sass-loader']
      }),
      include: __dirname + '/src/css'
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};
