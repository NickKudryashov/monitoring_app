import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface useThemeResult {
    toggleTheme: ()=>void;
    theme:Theme;
}

export function useTheme():useThemeResult{
    const {theme,setTheme} = useContext(ThemeContext);
    const toggleTheme = ()=>{
        const newTheme = theme===Theme.DARK ? Theme.LIGHT : Theme.DARK;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY,newTheme);
        setTheme(newTheme);
    };
    return {theme,toggleTheme};
}