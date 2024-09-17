import type { CSSProperties, HTMLProps, PropsWithChildren } from "react";
import cls from "./VFlexBox.module.scss";
import { ALIGNITEMS, GAP, JUSTIFYCONTENT } from "../props";
import classNames from "@/shared/lib/classNames/classNames";
interface VFlexBoxProps extends HTMLProps<HTMLDivElement> {
    className?: string;
    name?: string;
    align?: JUSTIFYCONTENT;
    gap?: GAP;
    alignItems?: ALIGNITEMS;
    width?: string;
    height?: string;
}

export function VFlexBox(props: PropsWithChildren<VFlexBoxProps>) {
    const {
        className = "",
        name,
        children,
        align,
        gap,
        alignItems,
        width,
        height,
        ...propss
    } = props;

    const styleProps: CSSProperties = {
        gap: gap,
        justifyContent: align,
        alignItems: alignItems,
        width,
        height,
    };

    return (
        <div
            className={classNames(cls.VFlexBox, {}, [className])}
            style={height ? { ...styleProps, height } : styleProps}
            {...propss}
        >
            {children}
        </div>
    );
}
