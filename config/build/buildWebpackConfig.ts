import { BuildOptions } from "./types/config";
import webpack from "webpack";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildPLugins } from "./buildPlugins";
import path from "path";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options:BuildOptions):webpack.Configuration {
    const {paths,mode,isDev} = options;
    return {
        mode,
        entry:paths.entry,
        output: {
            filename:"[name].[contenthash].js",
            path: paths.build,
            clean:true
        },
        module: {
            rules: buildLoaders(options) ,
        },
        resolve: buildResolvers(options),
        plugins: buildPLugins(options),
        devtool:isDev ? "inline-source-map" : undefined,
        devServer:isDev ? buildDevServer(options) : undefined
    };
}