import classNames from "shared/lib/classNames/classNames";
import { useEffect, useState } from "react";
import cls from "./SubcategoryPage.module.scss";

import type { PropsWithChildren } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/hooks";
import {
    fetchAuto,
    fetchChildren,
    fetchDetail,
    fetchElectro,
    fetchHeat,
    fetchPump,
} from "../model/service/fetchContent";
import { DetailView } from "widgets/DetailView";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { fetchByObjId } from "entities/ObjectSubCategory";
import { HeatDeviceDetailView } from "entities/Heatcounters";
import { PumpDevice } from "entities/PumpDevice";
import { deviceListActions } from "widgets/DeviceList/reducers/DeviceListReducer";
import { subCatPageActions } from "../model/slice/SubcategoryPageSlice";
import { AutoDevDetail } from "entities/AutomaticDevice";
import { HeatArchives } from "features/HeatArchives";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";

interface SubcategoryPageProps {
    className?: string;
}

const SubcategoryPage = (props: PropsWithChildren<SubcategoryPageProps>) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const numberID = Number(id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { entities, ids } = useSelector(
        (state: StateSchema) => state.objSubCat
    );
    const { currentSubcat } = useSelector(
        (state: StateSchema) => state.deviceList
    );
    const { electrocounter, heatcounters, pumps, subcats, current, autos } =
        useSelector((state: StateSchema) => state.subCatPage);
    const [isOpen, setIsOpen] = useState(false);
    // dispatch(fetchChildren(numberID));

    useEffect(() => {
        if (!currentSubcat && current) {
            dispatch(fetchByObjId(current.user_object));
        }
    }, [id]);

    useEffect(() => {
        if (ids.length === 0) {
            dispatch(fetchDetail(numberID)).then((res) =>
                dispatch(fetchByObjId(current.user_object))
            );
        }
    }, [current?.user_object, dispatch, ids.length, numberID]);

    //редирект если айди отсутствует, идут перерисовки бесконечные
    useEffect(() => {
        dispatch(subCatPageActions.removeElectro());
        dispatch(subCatPageActions.removeHeat());
        dispatch(subCatPageActions.removePumps());
        dispatch(subCatPageActions.removeAutos());
        dispatch(fetchDetail(numberID));
        dispatch(fetchChildren(numberID));
        dispatch(fetchHeat(numberID));
        dispatch(fetchElectro(numberID));
        dispatch(fetchPump(numberID));
        dispatch(fetchAuto(numberID));
        dispatch(deviceListActions.setSubcat(numberID));
    }, [dispatch, numberID, id]);

    const content = (
        <DetailView className={cls.detail}>
            <p>{current ? "Категория " + current.name : "Загрузка"}</p>
            {heatcounters &&
                heatcounters.map((el) => (
                    <HeatDeviceDetailView key={el} id={String(el)}>
                        <AppButon
                            theme={AppButtonTheme.SHADOW}
                            onClick={() => setIsOpen(true)}
                        >
                            Открыть архивы
                        </AppButon>
                        <HeatArchives
                            dev_id={el}
                            is_open={isOpen}
                            onClose={() => setIsOpen(false)}
                        />
                    </HeatDeviceDetailView>
                ))}
            {pumps && pumps.map((el) => <PumpDevice key={el} id={el} />)}
            {autos &&
                autos.map((el) => <AutoDevDetail key={el} id={String(el)} />)}
        </DetailView>
    );
    return (
        <div className={classNames(cls.SubcategoryPage, {}, [])}>{content}</div>
    );
};

export default SubcategoryPage;
