const path = require('path');

module.exports = {
  entry: {
    demo1: './demo1.js',
    demo2: './demo2.js',
    demo3: './demo3.js'
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
