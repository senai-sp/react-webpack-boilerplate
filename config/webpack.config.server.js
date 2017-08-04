module.exports = {
  entry: './server',
  output: {
    path: `${__dirname}/build`,
    filename: 'server.js',
  },
  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: '/node_modules/',
      loader: 'babel-loader',
    }]
  },
}
