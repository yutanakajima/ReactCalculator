module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
