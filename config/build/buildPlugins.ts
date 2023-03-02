import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { BuildOptions } from "./types/config";

export function buildPLugins({paths}:BuildOptions):webpack.WebpackPluginInstance[]{
    return [
        new HTMLWebpackPlugin({
            template:paths.html
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        })
    ];
}