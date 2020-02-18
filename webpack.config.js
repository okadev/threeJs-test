const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = env => {
  const isDevelopment = env.mode === "development" ? true : false;

  return {
    mode: env.mode,
    entry: "./src/index.ts",
    output: {
      filename: "bundle.[chunkhash].js",
      path: path.resolve(__dirname, "public")
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    devServer: {
      port: 3000
    },
    plugins: [
      new HTMLPlugin({
        template: "./src/index.html",
        filename: "index.html"
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "style.[contenthash].css"
      }),
      new CopyPlugin([{ from: "./src/assets", to: "assets" }])
    ]
  };
};
