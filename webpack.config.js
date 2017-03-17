const path = require('path');

module.exports = {
  entry: './entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    watchContentBase: true
  }
};
