
import { EntityId } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { CategoryItem, categorySlice } from "entities/Category";
import {  HeatDevice, HeatDeviceDetailView } from "entities/Heatcounters";
import { heatDeviceSlice } from "entities/Heatcounters/reducers/reducer";
import { ObjectDetail, ObjectItem, objectSlice } from "entities/Objects";
import { GeneralInformation } from "features/GeneralInformation";
import { ManualBulkHeatPolll, ManualHeatPoll } from "features/ManualHeatPoll";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/hooks/hooks";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";
import { DetailView } from "widgets/DetailView";
import {  DeviceList, deviceListSlice } from "widgets/DeviceList";
import { Navbar } from "widgets/Navbar";
import cls from "./MainPage.module.scss";
import { ElectroCounterDeviceDetail, electroDeviceActions } from "entities/ElectroDevice";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { ElectroDevicePoll } from "features/ElectroDevicePoll";
import { getUserData } from "entities/user";
import { Footer } from "shared/ui/Footer/Footer";
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
        console.log("после апдейта");

    };
    return (
        <div className={cls.MainPage}>
            <Navbar/>
            <div className={cls.sidebarwrapper}>
                <div className={cls.content}>
                    <div className={cls.listWithGeneral}>
                        {/* <AppButon className={cls.generalInfoBtn} onClick={()=>{dispatch(categorySlice.actions.closeAllCat());setGeneralSelected(true);}}>Общая информация</AppButon> */}
                        <DeviceList
                            onClick={()=>{setTabSelected(false);setGeneralSelected(false);}}
                        />
                    </div>
                    <DetailView
                        className={cls.detail}
                        tabSelected={tabSelected}
                        setTabSelected={setTabSelected}
                        generalSelected={generalSelected}
                        setGeneralSelected={setGeneralSelected}
                    >
                        {generalSelected && <GeneralInformation/>}
                        {currentObject===undefined && !isElectroDevice && !isHeatDevice  && currentCategory===undefined && null}
                        {currentCategory!==undefined && 
                        <ObjectCategoryView 
                            categoryClickHandler={categoryClickHandler}
                            objectClickHandler={objectClickHandler}
                            category={currentCategory}
                        /> }
                        {currentObject!==undefined &&
                        <ObjectDetail obj={currentObject}>
                            <MockComponent/>
                        </ObjectDetail>}
                        {isHeatDevice &&  
                        <HeatDeviceDetailView device={currentHeatDevice}>
                            <ManualHeatPoll onUpdate={updateCurrentDevice} device={currentHeatDevice}/>
                        </HeatDeviceDetailView> }
                        {isElectroDevice &&  
                        <ElectroCounterDeviceDetail id={currentElectroDevice.id}>

                            {/* <ManualHeatPoll onUpdate={updateCurrentDevice} device={currentElectroDevice}/> */}
                        </ElectroCounterDeviceDetail> }
                    </DetailView>
                    {/* <DetailView/> */}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;
