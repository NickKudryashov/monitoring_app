import { BuildOptions } from "../types/config";

interface BabelLoaderProps extends BuildOptions {
    isTsx:boolean
}

export const buildBabelLoader = ({isTsx}:BabelLoaderProps)=>{
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
                    "@babel/plugin-transform-runtime",

                ]
            }
        }};
    return loader;
};