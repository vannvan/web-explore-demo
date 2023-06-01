/**
 * Created by du on 16/9/24.
 */
var path = require("path");
var fs = require("fs");
var webpack = require("webpack");
module.exports = {
  entry: {
    // "ajaxhook": "./src/ajaxhook.js",
    ajaxhook: "./dist.js",
    test: ["./demon/test.js"],
    test1: ["./demon/test1.js"],
  },
  output: {
    path: "./dist",
    filename: "[name].min.js",
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
  ],
};
