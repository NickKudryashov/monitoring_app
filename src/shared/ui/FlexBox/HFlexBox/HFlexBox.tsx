

import type { PropsWithChildren } from "react";
import cls from "./HFlexBox.module.scss";
import { ALIGNITEMS, GAP, JUSTIFYCONTENT } from "../props";
import classNames from "shared/lib/classNames/classNames";

interface HFlexBoxProps {
 className?: string;
 name?:string;
 align?:JUSTIFYCONTENT;
 gap?:GAP;
 alignItems?:ALIGNITEMS
 width?:string;
 height?:string
}





export function HFlexBox(props: PropsWithChildren<HFlexBoxProps>) {
    const { className,name,children,align,gap,alignItems,height,width } = props;

    return (
        <div
            className={classNames(cls.HFlexBox,{},[className,])}
            style={
                {
                    justifyContent:align,
                    gap:gap,
                    alignItems:alignItems,
                    width,
                    height
                }
            }
        >
            {children}
        </div>
    );
}