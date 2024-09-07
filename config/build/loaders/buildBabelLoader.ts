import removePropsPlugin from "../../babel/removePropsPlugin";
import { BuildOptions } from "../types/config";

interface BabelLoaderProps extends BuildOptions {
    isTsx:boolean
}

export const buildBabelLoader = ({isTsx,isDev}:BabelLoaderProps)=>{
    const loader = {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/ ,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
                plugins:[
                    ["@babel/plugin-transform-typescript",  
                        {
                            isTsx
                        }
                    ],
                    isTsx && !isDev && [removePropsPlugin()],
                    "@babel/plugin-transform-runtime",
                    isDev && require.resolve('react-refresh/babel')

                ].filter(Boolean)
            }
        }};
    return loader;
};