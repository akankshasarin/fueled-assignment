// Imports: Dependencies
const path = require("path");
require("@babel/register");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Webpack Configuration
const config = {
  // Entry
  entry: { dashboard: "./src/scripts/checkout.js" },
  // Output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  // Loaders
  module: {
    rules: [
      // JavaScript/JSX Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      // CSS Files
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  // Plugins
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].bundle.css",
      chunkFilename: "[id].bundle.css"
      //   ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  ],
  watch: true,
  devtool: "none"
};
// Exports
module.exports = config;