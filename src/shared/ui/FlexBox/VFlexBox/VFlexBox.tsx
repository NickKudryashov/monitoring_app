

import type { PropsWithChildren } from "react";
import cls from "./VFlexBox.module.scss";
import { GAP, JUSTIFYCONTENT } from "../props";
interface VFlexBoxProps {
 className?: string;
 name?:string;
 align?:JUSTIFYCONTENT,
 gap?:GAP

}

export function VFlexBox(props: PropsWithChildren<VFlexBoxProps>) {
    const { className,name,children,align,gap } = props;

    return (
        <div
            className={cls.VFlexBox}
            style={{
                gap:gap,
                justifyContent:align
            }}
        >
            {children}
        </div>
    );
}