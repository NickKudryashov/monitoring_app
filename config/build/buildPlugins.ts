import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { BuildOptions } from "./types/config";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
export function buildPLugins({paths,api,isDev}:BuildOptions):webpack.WebpackPluginInstance[]{
    const plugins =  [
        new HTMLWebpackPlugin({
            template:paths.html,
            favicon: paths.src+"/shared/assets/icons/LogoIcon.svg"
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        }),
        new webpack.DefinePlugin({
            __API__:JSON.stringify(api),
            __IS_DEV__:JSON.stringify(isDev),
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                memoryLimit:4096,
                mode: "write-references",
            },
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
    ];
    if (isDev) {
        plugins.push(new ReactRefreshPlugin());

    }
    return plugins
}