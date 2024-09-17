import classNames from "@/shared/lib/classNames/classNames";
import cls from "./AppButton.module.scss";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import DarkIcon from "@/shared/assets/icons/darkIcon.svg";
interface AppButonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: AppButtonTheme;
    width?: string;
    height?: string;
}

export enum AppButtonTheme {
    AUTH = "auth_button",
    PRIMARY = "primary_btn",
    OUTLINE = "button_outline",
    SHADOW = "shadow_btn",
    DESIGNED_OUTLINE = "designed_outline",
    DESIGNED_PRIMARY = "designed_primary",
    SUBCATEGORY_BUTTON = "sub_btn",
}

export function AppButon(props: PropsWithChildren<AppButonProps>) {
    const {
        className = "",
        children,
        theme = "",
        width,
        height,
        ...otherProps
    } = props;

    return (
        <button
            className={classNames(cls.AppButon, {}, [className, cls[theme]])}
            style={{
                width,
                height,
            }}
            {...otherProps}
        >
            {children}
        </button>
    );
}
