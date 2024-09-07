import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pathCheckerPlugin from 'eslint-plugin-fsd-paths-nick'
import eslintConfigPrettier from "eslint-config-prettier";
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    plugins:{
    pathCheckerPlugin:pathCheckerPlugin
  },
    rules: {
    'react/react-in-jsx-scope':'off',
    'pathCheckerPlugin/check-imports':'error'
  }
}
];