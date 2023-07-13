import classNames from "shared/lib/classNames/classNames";
import cls from "./GeneralInformation.module.scss";

import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { categorySlice } from "entities/Category";
import { PumpDevice } from "entities/PumpDevice";

interface GeneralInformationProps {
 className?: string;
}

export function GeneralInformation(props: PropsWithChildren<GeneralInformationProps>) {
    const { className } = props;
    const {ids} = useSelector((state:StateSchema)=>state.heatDevices);
    const {data} = useSelector((state:StateSchema)=>state.electroDevices);
    const {data:pumpData} = useSelector((state:StateSchema)=>state.pumpDevices);
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const dispatch = useAppDispatch();
    dispatch(categorySlice.actions.closeAllCat());
    return (
        <div className={classNames(cls.GeneralInformation,{},[className])}>
            {`Количество объектов:${objects.length}`}
            <br/>
            {`Количество приборов УУТЭ:${ids.length}`}
            <br/>
            {`Количество приборов АСКУЭ:${data?.topLevelDevices.length ?? "Загрузка..."}`}
            <br/>
            {`Количество насосных приборов:${pumpData?.length ?? "Загрузка..."}`}
        </div>
    );
}