var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

process.env.BABEL_ENV = TARGET;

module.exports = {
  // The standard entry point and output config
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|svg$)$/,
        loader: 'url?limit=25000',
        include: [APP_PATH]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader'),
        include: [APP_PATH]
      }
    ]
  },
  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
  plugins: [
    new HtmlwebpackPlugin({
      title: 'synbydesign.design',
      template: 'src/index.tpl.html',
      hash: true,
      minify: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true
      }
    }),
    new ExtractTextPlugin("[name].css")
  ]
};
