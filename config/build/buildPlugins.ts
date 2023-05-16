import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { BuildOptions } from "./types/config";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export function buildPLugins({paths,api,isDev}:BuildOptions):webpack.WebpackPluginInstance[]{
    return [
        new HTMLWebpackPlugin({
            template:paths.html
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        }),
        new webpack.DefinePlugin({
            __API__:JSON.stringify(api),
            __IS_DEV__:JSON.stringify(isDev)
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: "write-references",
            },
        })
    ];
}