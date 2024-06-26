import classNames from "shared/lib/classNames/classNames";
import cls from "./AutoDevDetail.module.scss";

import { PropsWithChildren, useEffect, useState } from "react";
import { getAutomaticDevice } from "entities/AutomaticDevice/api/AutomaticDeviceApi";
import { Loader } from "shared/ui/Loader/Loader";

interface DetailViewProps {
    className?: string;
    id: string;
}

export const AutoDevDetail = (props: PropsWithChildren<DetailViewProps>) => {
    const { className, children, id } = props;

    // console.log("детейл счетчик рендерится");
    return (
        <div className={classNames(cls.AutoDevDetail, {}, [className])}></div>
    );
};
