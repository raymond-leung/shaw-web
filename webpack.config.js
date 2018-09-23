const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require("dotenv").config();

module.exports = {
    target: 'web',
    entry: { main: "./src/index.js" },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "client.js"
    },
    devServer: {
        host: "0.0.0.0",
        contentBase: "./src/",
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                API_URL: JSON.stringify(process.env.API_URL),
                START_DATE: JSON.stringify(process.env.START_DATE),
                END_DATE: JSON.stringify(process.env.END_DATE)
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new ExtractTextPlugin({ filename: "style.css" })
    ]
};
