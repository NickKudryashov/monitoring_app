import classNames from "shared/lib/classNames/classNames";
import cls from "./AppInput.module.scss";

import type { InputHTMLAttributes, PropsWithChildren } from "react";

export enum InputThemes {
    AUTH="auth",
    DEFAULT="default",
    OUTLINE="outline"
}   


interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
 className?: string;
 theme?:InputThemes;

}

export function AppInput(props: PropsWithChildren<AppInputProps>) {
    const { 
        className,
        theme=InputThemes.AUTH,
        onChange,
        value,
        placeholder="Ввод...",
        type="text" 
    } = props;


    return (
        <input 
            className={classNames(cls.AppInput,{},[cls[className],cls[theme]])}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
        />
    );
}