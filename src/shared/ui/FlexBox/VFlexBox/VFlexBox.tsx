

import type { PropsWithChildren } from "react";
import cls from "./VFlexBox.module.scss";
import { ALIGNITEMS, GAP, JUSTIFYCONTENT } from "../props";
import classNames from "shared/lib/classNames/classNames";
interface VFlexBoxProps {
 className?: string;
 name?:string;
 align?:JUSTIFYCONTENT,
 gap?:GAP,
 alignItems?:ALIGNITEMS

}

export function VFlexBox(props: PropsWithChildren<VFlexBoxProps>) {
    const { className,name,children,align,gap,alignItems } = props;

    return (
        <div
            className={classNames(cls.VFlexBox,{},[className,])}
            style={{
                gap:gap,
                justifyContent:align,
                alignItems:alignItems
            }}
        >
            {children}
        </div>
    );
}