const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',

  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: 'style-loader',
          use: ['css-loader',  'resolve-url-loader', 'sass-loader']
        })
      },
      {
        test: /.(png|jpg|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/'
          }
        }]
      },

      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'assets/fonts/'
            }
        }]
    }
]
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
   ]
};
