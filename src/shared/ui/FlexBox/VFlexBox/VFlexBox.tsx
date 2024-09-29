import {
    ForwardedRef,
    forwardRef,
    ReactElement,
    type CSSProperties,
    type HTMLProps,
    type PropsWithChildren,
} from "react";
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

export const VFlexBox = forwardRef(
    (
        props: PropsWithChildren<VFlexBoxProps>,
        ref: ForwardedRef<HTMLDivElement>,
    ) => {
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
                ref={ref}
                className={classNames(cls.VFlexBox, {}, [className])}
                style={height ? { ...styleProps, height } : styleProps}
                {...propss}
            >
                {children}
            </div>
        );
    },
);

VFlexBox.displayName = "VStack";
