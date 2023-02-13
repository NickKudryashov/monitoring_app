import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from './types/config';

export function buildLoaders(options:BuildOptions):webpack.RuleSetRule[]{
  
  const babelLoader = {
      // test: /\.m?js$/,
      test: /\.(js|jsx|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
    }
  }
  
  
  const typescript_loader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    const scss_loader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader:"css-loader",
            options:{
              modules:{
                auto:(resPath:string) => Boolean(resPath.includes('.module.')),
                localIdentName: options.isDev 
                ? '[path][name]__[local]' 
                : '[hash:base64:8]'
              }
            }
            },
          // Compiles Sass to CSS
          "sass-loader",
        ]
    }
    return [
        babelLoader,
        typescript_loader,
        scss_loader
      ]
}