import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { CategoryItem, categorySlice } from "entities/Category";
import { HeatDevice } from "entities/Heatcounters";
import { heatDeviceSlice } from "entities/Heatcounters/reducers/reducer";
import { ObjectItem, objectSlice } from "entities/Objects";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/hooks/hooks";
import { DetailView } from "widgets/DetailView";
import { deviceListSlice } from "widgets/DeviceList";
import cls from "./MainPage.module.scss";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { getUserData } from "entities/user";
import { Map, Placemark } from "react-yandex-maps";
const MainPage = () => {
    const {
        currentObject,
        currentCategory,
        currentElectroDevice,
        currentHeatDevice,
        isElectroDevice,
        isHeatDevice,
    } = useSelector((state: StateSchema) => state.deviceList);
    const dispatch = useAppDispatch();
    const heatDevRef = useRef<HeatDevice>();
    const electroDevRef = useRef<TopLevelElectroDevice>();
    heatDevRef.current = currentHeatDevice;
    electroDevRef.current = currentElectroDevice;
    // const currentDevice:HeatDevice = undefined;
    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);
    return (
        <div className={cls.MainPage}>
            <DetailView className={cls.detail}></DetailView>
            {/* <DetailView/> */}
        </div>
    );
};

export default MainPage;
