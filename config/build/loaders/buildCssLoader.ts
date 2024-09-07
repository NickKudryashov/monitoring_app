import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildCssLoader = (isDev:boolean)=>{
    const scss_loader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader:"css-loader",
                options:{
                    modules:{
                        auto:(resPath:string) => Boolean(resPath.includes(".module.")),
                        namedExport: false,
                        exportLocalsConvention: 'as-is',
                        localIdentName: isDev 
                            ? "[path][name]__[local]__[hash:base64:8]" 
                            : "[hash:base64:8]"
                    }
                }
            },
            // Compiles Sass to CSS
            "sass-loader",
        ]
    };
    return scss_loader;
};