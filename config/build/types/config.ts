export type BuildMode = "development" | "production";

export interface BuildPaths {
    entry:string;
    build:string;
    html:string;
    src:string;
}

export interface BuildOptions {
    mode:BuildMode;
    paths: BuildPaths;
    isDev:boolean;
    port:number;
    api:string;
    // staticFiles:string;
}

export interface BuildEnv {
    mode:BuildMode;
    port:number;
    api:string;
    dev:boolean;
}