import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";

export function buildLoaders(options:BuildOptions):webpack.RuleSetRule[]{
  
    const babelLoader = {
        // test: /\.m?js$/,
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            }
        }
    };
    
    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: "file-loader",
                options:{
                    name: "icons/[name].[ext]",
                }
            },
        ],};


    const svgLoader = {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    };
  
    const typescript_loader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };
    const scss_loader = buildCssLoader(options.isDev);
    return [
        svgLoader,
        babelLoader,
        typescript_loader,
        scss_loader,
        // fileLoader,

    ];
}