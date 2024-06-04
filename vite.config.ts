import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),svgr({exportAsDefault:true})],
    define:{
        __API__:JSON.stringify("http://localhost:8000/api/v1/"),
        __IS_DEV__:true
    },
    resolve: {
        alias: {
            src:path.resolve(__dirname,"src"),
            pages:path.resolve(__dirname,"src/pages"),
            entities:path.resolve(__dirname,"src/entities"),
            shared:path.resolve(__dirname,"src/shared"),
            widgets:path.resolve(__dirname,"src/widgets"),
            features:path.resolve(__dirname,"src/features"),
            app:path.resolve(__dirname,"src/app"),
        },
    },
});
