import path from "path";
import { buildPLugins } from "./config/build/buildPlugins";
import webpack from "webpack";
import { buildLoaders } from "./config/build/buildLoaders";
import { buildResolvers } from "./config/build/buildResolvers";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildPaths } from "./config/build/types/config";


export default (env:BuildEnv)=>{
    const paths:BuildPaths = {
        entry:path.resolve(__dirname,"src","index.tsx"),
        html:path.resolve(__dirname,"public","index.html"),
        build:path.resolve(__dirname,"build"),
        src:path.resolve(__dirname,"src")
    };
  
    const mode= env.mode || "production";
    const isDev = env.dev;
    const PORT = env.port || 3000;
    const API = env.api || "http://avs.eco:8000/api/v1/";
    // const STATIC = isDev ? "http://localhost:8000" : "http://avs.eco:8000";
    const config:webpack.Configuration = buildWebpackConfig({
        mode,
        paths:paths,
        isDev,
        port:PORT,
        api:API,
        // staticFiles:STATIC
    });
    return config;
};