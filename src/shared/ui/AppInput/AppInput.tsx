import classNames from "@/shared/lib/classNames/classNames";
import cls from "./AppInput.module.scss";

import type { InputHTMLAttributes, PropsWithChildren } from "react";
import { Field, Input, Label } from "@headlessui/react";

export enum InputThemes {
    AUTH = "auth",
    DEFAULT = "default",
    SHADOW = "shadow",
    OUTLINE = "outline",
    CLEAR = "clear",
    DESIGNED_PRIMARY = "designed_primary",
}

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    theme?: InputThemes;
    label?: string;
}

export function AppInput(props: PropsWithChildren<AppInputProps>) {
    const {
        className = "",
        theme = InputThemes.AUTH,
        onChange,
        value,
        width,
        placeholder = "Ввод...",
        type = "text",
    } = props;

    return (
        <input
            className={classNames(cls.AppInput, {}, [className, cls[theme]])}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            style={{ width: width }}
            value={value}
            {...props}
        />
        // <Field>
        //     <Input
        //         className={classNames(cls.AppInput, {}, [
        //             className,
        //             cls[theme],
        //         ])}
        //         onChange={onChange}
        //         placeholder={placeholder}
        //         type={type}
        //         value={value}
        //         {...props}
        //     />
        // </Field>
    );
}
