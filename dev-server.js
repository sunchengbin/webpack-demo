const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.config');
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const app = express()
const compiler = webpack(webpackConfig)
app.use(devMiddleware(compiler, {
    noInfo: true,
    index: 'index.html',
    publicPath: webpackConfig.output.publicPath
}));
app.use(hotMiddleware(compiler, {
    log: false,
    path: "/",
    reload:true,
    heartbeat: 2000
}));
