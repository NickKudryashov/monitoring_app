import type { HTMLProps, PropsWithChildren } from "react";
import cls from "./HFlexBox.module.scss";
import { ALIGNITEMS, GAP, JUSTIFYCONTENT } from "../props";
import classNames from "@/shared/lib/classNames/classNames";

interface HFlexBoxProps extends HTMLProps<HTMLDivElement> {
    className?: string;
    name?: string;
    align?: JUSTIFYCONTENT;
    gap?: GAP;
    alignItems?: ALIGNITEMS;
    width?: string;
    height?: string;
    onClick?: () => void;
}

export function HFlexBox(props: PropsWithChildren<HFlexBoxProps>) {
    const {
        className = "",
        name,
        children,
        align,
        gap,
        alignItems,
        height,
        width,
        onClick,
        ...propsS
    } = props;

    return (
        <div
            className={classNames(cls.HFlexBox, {}, [className])}
            onClick={onClick}
            style={{
                justifyContent: align,
                gap: gap,
                alignItems: alignItems,
                width,
                height,
            }}
            {...propsS}
        >
            {children}
        </div>
    );
}
