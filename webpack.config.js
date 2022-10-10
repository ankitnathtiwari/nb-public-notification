const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { envConfig, env_state } = require("./env_config/index");

module.exports = {
  //entrypoint
  //outputpoint
  output: {
    path: path.join(__dirname, "public", "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: envConfig === "staging" ? env_state.PRODUCTION : envConfig,

  module: {
    //rules an arry of objects
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              encoding: false,
            },
          },
        ],
      },
    ],
  },

  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],

  //devServer historyApiFallback for react router
  // devtool: "source-map",
  devtool: envConfig === env_state.DEVELOPEMENT ? "source-map" : false,
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
  },
};
