const path = require('path');

module.exports = {
  entry: {
    demo1: './demo1.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    watchContentBase: true
  }
};
