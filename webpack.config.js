const path                  = require('path');
const webpack               = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const TerserPlugin          = require('terser-webpack-plugin');

module.exports = {
    entry: [
      './assets/scripts/index.js',
      './assets/styles/scss/style.scss'
    ],
    devtool: 'source-map',
    mode:    'production',
    optimization: {
      minimizer: [new TerserPlugin({
        extractComments: false,
      })],
    },
    output: {
      filename: 'main.js',
      path:      path.resolve(__dirname, 'dist/scripts/')
    },
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename:      '../styles/[name].css',
        chunkFilename: '[id].css'
      }),
      new webpack.ProvidePlugin({
        $:      '../node_modules/jquery/dist/jquery.min.js',
        jQuery: '../node_modules/jquery/dist/jquery.min.js',
      }),
      new WebpackNotifierPlugin()
    ]
};
