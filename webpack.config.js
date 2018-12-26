const path = require('path');
const env = require('yargs').argv.mode;
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '/');
const libraryName = 'smarttv-framework';
const plugins = [];

if (env !== 'dev') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    minimize: true,
    sourceMap: true,
    include: /\.min\.js$/
  }));
}

const config = {
  entry: {
    [libraryName]: `${__dirname}/src/index.js`,
    [`${libraryName}.min`]: `${__dirname}/src/index.js`
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins
};

module.exports = config;
