const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: "production",
  entry: {
    vendor: ['react', 'react-dom'],
    app: ['./index.js']
  },
  context:path.resolve(__dirname, '../preview'),
  output: {
    path: buildPath,
    publicPath: "/ko-charts/",
    chunkFilename: "js/[name].[hash].js",
    filename: "js/[name].[hash].js",
  },
  module: {
    rules: [{
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        use: ['file-loader?name=fonts/[hash:8].[name].[ext]']
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?[tv]=[\d.]+)*$/,
        use: ['file-loader?limit=8192&name=imgs/[hash:8].[name].[ext]']
      },
      {
        test: /\.(js)$/,
        use: ["strip-loader?strip[]=debug,strip[]=console.log"],
        exclude: /node_modules/
      },
      {
        test: /\.md$/,
        loader : 'raw-loader'
      }
    ]
  },
  performance: { 
    hints: false, 
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      minSize: 30000,
      maxSize: 3000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor'
        }
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[hash].css"
    }),
    new CopyWebpackPlugin([ 
        {from: './assets/imgs',to:"./imgs"}
     ]),
    new HtmlWebpackPlugin({
      title: "ko",
      filename: 'index.html',
      template: 'index.html',
      hash: false,
      chunksSortMode: "none",
      assets: {
        favicon: '/imgs/favicon.ico',
        config_js: '/conf/conf.prod.js'
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};