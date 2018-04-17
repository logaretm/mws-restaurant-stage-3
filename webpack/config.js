const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const isProduction = process.env.NODE_ENV === 'production';

let config = {
  context: path.resolve(__dirname, '..'),
  entry: './resources/js/app',
  plugins: [
    new CleanWebpackPlugin(['../assets']),
    new HtmlWebpackPlugin({
      title: 'Restaurants Review',
      filename: 'views/index.html',
      template: 'resources/views/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Restaurant Review',
      filename: 'views/restaurant.html',
      template: 'resources/views/restaurant.html'
    })
  ],
  output: {
    filename: 'assets/js/[name].js',
    path: path.resolve(__dirname, '..'),
    publicPath: "/assets/",
  },
  module: {
    rules: [
      // js loaders
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['@babel/preset-env', { targets: { browsers: ["last 2 versions", "safari >= 7"] } } ]
            ]
          }
        }
      },

      // file loaders
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};

config = merge(config, require(isProduction ? './prod' : './dev'));

module.exports = config;
