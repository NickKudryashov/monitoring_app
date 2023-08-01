import classNames from "shared/lib/classNames/classNames";
import { ReactNode, memo, useEffect } from "react";
import cls from "./ElectroNodeDetail.module.scss";

import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

interface ElectroNodeDetailProps {
 className?: string;
 polLFeature?:ReactNode
}

export const ElectroNodeDetail = memo((props: PropsWithChildren<ElectroNodeDetailProps>) => {
    const { className,children,polLFeature } = props;
    const {topLevelDevices} = useSelector((state:StateSchema)=>state.electroDevices.data);
    // useEffect(()=>{},[topLevelDevices]);
    return (
        <div className={classNames(cls.ElectroNodeDetail,{},[className])}>
            <b className={cls.title}>АСКУЭ (Автоматизированная система контроля и учета электроэнергии)</b>
            <br/>
            <br/>
            <div className={cls.pollFeature}>
                <p className={cls.subtitle}>УУЭ (Узел учета электроэнергии)</p>
                {polLFeature}
            </div>
            <div className={cls.content}>
                {children}
            </div>
        </div>
    );
});
