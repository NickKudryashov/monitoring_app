import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatNodeDetailView.module.scss";

import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import { HeatNodeResponse } from "entities/HeatNodes/types/types";

interface DetailViewProps {
 className?: string;
 pollFeature?: ReactElement;
 heatNode: HeatNodeResponse;
}

export function HeatNodeDetailView(props: PropsWithChildren<DetailViewProps>) {
    const { className,children,pollFeature } = props;
    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <br/>
            <b className={cls.textinfo}>ИТП (Индивидуальный тепловой пункт)</b>
            <br/>
            <div className={cls.countersBlock}>
                <div className={cls.featureBlock}>
                    <p className={cls.textinfo}>УУТЭ (Узел учета тепловой энергии)</p>
                    {pollFeature}
                </div>
                {children}
            </div>
            <div className={cls.countersBlock}>
                <p className={cls.textinfo}>Автоматика ИТП</p>
            </div>
        </div>
    );
}

