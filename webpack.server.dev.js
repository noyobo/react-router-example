const merge = require('webpack-merge');
const path = require('path');

const configBase = require('./webpack.config.base');

const config = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    stats: {
      modules: false,
      chunkModules: false,
      chunks: false,
    },
  },
};

const configDev = merge({}, configBase, config);

module.exports = configDev;
