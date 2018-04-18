const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const merge = require('webpack-merge');

const isProduction = process.env.NODE_ENV === 'production';

let config = {
  context: path.resolve(__dirname, '..'),
  entry: './assets/js/app',
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['public', 'views'], {
      root: path.resolve(__dirname, '..'),
      exclude: ['.gitignore', 'img', 'favicon.ico'],
    }),
    new HtmlWebpackPlugin({
      title: 'Restaurants Review',
      filename: '../views/index.html',
      template: 'assets/views/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Restaurant Review',
      filename: '../views/restaurant.html',
      template: 'assets/views/restaurant.html'
    })
  ],
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // js loaders
      {
        test: /\.js$/,
        exclude: /(node_modules|sw\.js)/,
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
        test: /\.webmanifest$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].webmanifest'
            }
          }
        ]
      },
      {
        test: /sw\.js$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].js'
            }
          }
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
