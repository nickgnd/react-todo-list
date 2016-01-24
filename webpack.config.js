// very basic webpack config

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: "./app.jsx",
    html: "./index.html"
  },
  output: {
    filename: 'app.js',
    path: __dirname + '/dist'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        loaders: ["react-hot", 'babel-loader']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  }
};

