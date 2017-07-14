const webpack = require('webpack'); //to access webpack runtime
const configuration = require('./webpack.css.config.js');

let compiler = webpack(configuration);
compiler.apply(new webpack.ProgressPlugin());

compiler.run(function(err, stats) {
  //console.log(err)
  //console.log(stats)
});
