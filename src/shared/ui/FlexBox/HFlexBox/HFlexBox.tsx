

import type { PropsWithChildren } from "react";
import cls from "./HFlexBox.module.scss";
import { JUSTIFYCONTENT } from "../props";

interface HFlexBoxProps {
 className?: string;
 name?:string;
 align?:JUSTIFYCONTENT
}





export function HFlexBox(props: PropsWithChildren<HFlexBoxProps>) {
    const { className,name,children,align } = props;

    return (
        <div className={cls.HFlexBox} style={{justifyContent:align}}>
            {children}
        </div>
    );
}