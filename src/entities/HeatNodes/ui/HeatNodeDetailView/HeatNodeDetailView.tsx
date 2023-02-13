import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatNodeDetailView.module.scss";

import type { PropsWithChildren } from "react";
import { HeatNodeResponse } from "entities/HeatNodes/types/types";

interface DetailViewProps {
 className?: string;
 heatNode: HeatNodeResponse;
}

export function HeatNodeDetailView(props: PropsWithChildren<DetailViewProps>) {
    const { className,heatNode,children } = props;

    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <p>Здесь будет общая информация по узлам</p>
            {children}
        </div>
    );
}