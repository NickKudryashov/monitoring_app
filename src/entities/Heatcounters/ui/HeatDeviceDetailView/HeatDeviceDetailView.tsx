import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatDeviceDetailView.module.scss";

import { PropsWithChildren } from "react";

interface DetailViewProps {
    className?: string;
    id: string;
}

export function HeatDeviceDetailView(
    props: PropsWithChildren<DetailViewProps>
) {
    const { className, children, id } = props;

    // console.log("детейл счетчик рендерится");
    return <div className={classNames(cls.DetailView, {}, [className])}></div>;
}
