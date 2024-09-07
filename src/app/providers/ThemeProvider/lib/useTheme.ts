import { useContext, useEffect } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface useThemeResult {
    toggleTheme: ()=>void;
    theme:Theme;
}

export function useTheme():useThemeResult{
    const {theme,setTheme} = useContext(ThemeContext);
    useEffect(()=>{
        if (!theme && setTheme) {
            setTheme(Theme.LIGHT);
        }
        document.body.classList.add(theme);
    },[]);
    const toggleTheme = ()=>{
        const newTheme = theme===Theme.DARK ? Theme.LIGHT : Theme.DARK;
        document.body.classList.remove(theme);
        document.body.classList.add(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY,newTheme);
        if (setTheme) {
            setTheme(newTheme);
        }
    };
    return {theme,toggleTheme};
}