import classNames from "shared/lib/classNames/classNames";
import cls from "./GeneralInformation.module.scss";

import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { categorySlice } from "entities/Category";

interface GeneralInformationProps {
 className?: string;
}

export function GeneralInformation(props: PropsWithChildren<GeneralInformationProps>) {
    const { className } = props;
    const {ids} = useSelector((state:StateSchema)=>state.heatDevices);
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const dispatch = useAppDispatch();
    dispatch(categorySlice.actions.closeAllCat());
    return (
        <div className={classNames(cls.GeneralInformation,{},[className])}>
            {`Количество объектов:${objects.length}`}
            <br/>
            {`Количество приборов УУТЭ:${ids.length}`}
        </div>
    );
}