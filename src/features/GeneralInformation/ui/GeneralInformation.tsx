import classNames from "shared/lib/classNames/classNames";
import cls from "./GeneralInformation.module.scss";

import type { PropsWithChildren } from "react";
import { useAppSelector } from "shared/hooks/hooks";

interface GeneralInformationProps {
 className?: string;
}

export function GeneralInformation(props: PropsWithChildren<GeneralInformationProps>) {
    const { className } = props;
    const {devices} = useAppSelector(state=>state.heatDeviceReducer);
    const {objects} = useAppSelector(state=>state.objectReducer);
    return (
        <div className={classNames(cls.GeneralInformation,{},[className])}>
            {`Количество объектов:${objects.length}`}
            <br/>
            {`Количество приборов УУТЭ:${devices.length}`}
        </div>
    );
}