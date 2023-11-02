import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export function buildLoaders(options:BuildOptions):webpack.RuleSetRule[]{
  
    const babelLoaderCode = buildBabelLoader({...options,isTsx:false});
    const babelLoaderTsx = buildBabelLoader({...options,isTsx:true});
    
    const svgLoader = {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    };
  
    const typescript_loader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };
    const image_loader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    };
    const scss_loader = buildCssLoader(options.isDev);
    return [
        svgLoader,
        babelLoaderCode,
        babelLoaderTsx,
        // typescript_loader,
        scss_loader,
        // fileLoader,
        image_loader

    ];
}