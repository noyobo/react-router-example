const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const outputDir = 'dist';

const configBase = {
  target: 'web',
  entry: {
    react: ['react', 'react-dom'],
    index: [path.join(__dirname, 'src/index.js')],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, outputDir),
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'node_modules/')],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        '> 1%',
                        'ie >= 9',
                        'iOS >= 8',
                        'Android >= 4',
                      ],
                    },
                  },
                ],
                ['@babel/preset-stage-0', { decoratorsLegacy: true }],
                '@babel/preset-react',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      title: 'example',
      chunks: ['react', 'commons', 'index'],
      filename: 'index.html',
    }),
  ],
  stats: {
    modules: false,
    chunkModules: false,
    chunks: false,
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = configBase;
