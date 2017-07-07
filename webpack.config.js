const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm
const webpack = require('webpack') //to access built-in plugins
const fs = require('fs')

module.exports = {
    entry: './app.js',
    output: {
      path: path.resolve(__dirname,'dist'),
      filename: '[name].js',
      chunkFilename: "[name].js"
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
