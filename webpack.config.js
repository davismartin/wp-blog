const path = require("path");
const webpack = require("webpack");

const config = {
  context: __dirname,
  entry: ["./wp-content/themes/my-blog-theme/App.jsx"],
  devtool:
    process.env.NODE_ENV === "development" ? "cheap-eval-source-map" : false,
  output: {
    path: path.resolve(__dirname, "./wp-content/themes/my-blog-theme/assets/"),
    filename: "bundle.js",
    publicPath: "./wp-content/themes/my-blog-theme/assets/"
  },
  devServer: {
    hot: true,
    publicPath: "./wp-content/themes/my-blog-theme/assets/",
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [
          path.resolve("js"),
          path.resolve("node_modules/preact-compat/src")
        ]
      }
    ]
  }
};

// if (process.env.NODE_ENV === "development") {
//   config.entry.unshift(
//     "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"
//   );
// }

module.exports = config;
