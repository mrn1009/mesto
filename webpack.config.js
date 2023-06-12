const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    open: true,
    port: 8080,
    compress: true,
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/',

        },
    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          }, 'postcss-loader']
    },
    {
        test: /\.(svg|jpg)$/,
        type: 'asset/resource',
        generator: {
            filename: 'images/[name].[hash][ext]',
        }
    },
    {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[hash][ext]',
        }
    }
      
  ],
},
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html' // путь к файлу index.html
      }),
    new MiniCssExtractPlugin(),
  ]
};
