
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { CategoryItem, categorySlice } from "entities/Category";
import {  HeatDevice } from "entities/Heatcounters";
import { heatDeviceSlice } from "entities/Heatcounters/reducers/reducer";
import { ObjectItem, objectSlice } from "entities/Objects";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/hooks/hooks";
import { DetailView } from "widgets/DetailView";
import {  deviceListSlice } from "widgets/DeviceList";
import cls from "./MainPage.module.scss";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { getUserData } from "entities/user";
import {Map,Placemark} from 'react-yandex-maps'
const MainPage = () => {
    const {currentObject,currentCategory,currentElectroDevice,currentHeatDevice,isElectroDevice,isHeatDevice} = useSelector((state:StateSchema)=>state.deviceList);
    const dispatch = useAppDispatch();
    const {entities,selectedDeviceID} = useSelector((state:StateSchema)=>state.heatDevices);
    const {selectedDevice:selectedElectroDevice,data:electroData} = useSelector((state:StateSchema)=>state.electroDevices);
    const [tabSelected,setTabSelected] = useState(true);
    const [generalSelected,setGeneralSelected] = useState(false);
    const {isAuth} = useSelector((state:StateSchema)=>state.user);
    const heatDevRef = useRef<HeatDevice>();
    const electroDevRef = useRef<TopLevelElectroDevice>();
    heatDevRef.current=currentHeatDevice;
    electroDevRef.current=currentElectroDevice;
    // const currentDevice:HeatDevice = undefined;

    const objectClickHandler = (obj:ObjectItem) => {
        dispatch(objectSlice.actions.closeAllObjExceptSelected(obj));
        dispatch(deviceListSlice.actions.setObject(obj));
        setGeneralSelected(false);
    };
    const categoryClickHandler = (cat:CategoryItem)=>{
        dispatch(categorySlice.actions.openCat(cat.id));
        dispatch(categorySlice.actions.closeAllCatsExceptSelected(cat));
        dispatch(deviceListSlice.actions.setCategory(cat));
        dispatch(objectSlice.actions.closeAllObjByCategoryId(cat.id));
        setGeneralSelected(false);

    };
    useEffect(()=>{dispatch(getUserData());},[dispatch]);
    const updateCurrentDevice =  async ()=>{
        if (heatDevRef?.current?.id) {
            if (currentHeatDevice.id===heatDevRef.current.id) {
                dispatch(heatDeviceSlice.actions.updateOne(currentHeatDevice));
                dispatch(deviceListSlice.actions.setHeatDevice(currentHeatDevice));
            }
        }

    };
    return (
        <div className={cls.MainPage}>
                    <DetailView
                        className={cls.detail}
                        tabSelected={tabSelected}
                        setTabSelected={setTabSelected}
                        generalSelected={generalSelected}
                        setGeneralSelected={setGeneralSelected}
                    >
                    </DetailView>
                    {/* <DetailView/> */}
                </div>
    );
};

export default MainPage;
