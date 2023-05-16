import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect } from "react";
import cls from "./ElectroNodeDetail.module.scss";

import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

interface ElectroNodeDetailProps {
 className?: string;
}

export const ElectroNodeDetail = memo((props: PropsWithChildren<ElectroNodeDetailProps>) => {
    const { className,children } = props;
    const {topLevelDevices} = useSelector((state:StateSchema)=>state.electroDevices.data);
    useEffect(()=>{},[topLevelDevices]);
    return (
        <div className={classNames(cls.ElectroNodeDetail,{},[className])}>
            Узел учета электроэнергии
            {children}
        </div>
    );
});
