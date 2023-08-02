import { ReactNode, memo } from "react";
import cls from "./PumpStationNode.module.scss";
import classNames from "shared/lib/classNames/classNames";

export interface PumpStationNodeProps {
 className?: string;
 children?:ReactNode
}

export const PumpStationNode = memo((props:PumpStationNodeProps) => {
    const { className,children } = props;

    return (
        <div className={classNames(cls.PumpNodeDetail,{},[className])}>
            <b className={cls.title}>ПНС</b>
            <br/>
            <br/>
            <div className={cls.content}>
                {children}
            </div>
        </div>
    );
});
