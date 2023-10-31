import classNames from "shared/lib/classNames/classNames";
import cls from "./AppButton.module.scss";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import DarkIcon from "shared/assets/icons/darkIcon.svg";
interface AppButonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
 className?: string;
 theme?:AppButtonTheme;
}

export enum AppButtonTheme {
    AUTH="auth_button",
    PRIMARY="primary_btn",
    OUTLINE="button_outline",
    SHADOW="shadow_btn",
    DESIGNED_OUTLINE="designed_outline",
    DESIGNED_PRIMARY="designed_primary"
}

export function AppButon(props: PropsWithChildren<AppButonProps>) {
    const { className,children,theme,...otherProps } = props;

    return (
        <button 
            className={classNames(cls.AppButon,{},[className,cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>  
    );
}