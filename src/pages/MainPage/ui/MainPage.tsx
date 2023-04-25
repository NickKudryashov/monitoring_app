
import { EntityId } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { CategoryItem, categorySlice } from "entities/Category";
import {  HeatDevice, HeatDeviceDetailView } from "entities/Heatcounters";
import { heatDeviceSlice } from "entities/Heatcounters/reducers/reducer";
import { HeatNodeDetailView, HeatNodeResponse } from "entities/HeatNodes";
import { ObjectDetail, ObjectItem, objectSlice } from "entities/Objects";
import { GeneralInformation } from "features/GeneralInformation";
import { ManualBulkHeatPolll, ManualHeatPoll } from "features/ManualHeatPoll";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/hooks/hooks";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";
import { DetailView } from "widgets/DetailView";
import {  DeviceList, deviceListSlice } from "widgets/DeviceList";
import { Navbar } from "widgets/Navbar";
import cls from "./MainPage.module.scss";
import { ElectroCounterDeviceDetail, electroDeviceActions } from "entities/ElectroDevice";
import { ElectroNodeData, ElectroNodeDetail } from "entities/ElectroNodes";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { ElectroDevicePoll } from "features/ElectroDevicePoll";
const MainPage = () => {
    const {currentObject,currentHeatNode,currentCategory,currentElectroDevice,currentHeatDevice,currentElectroNode,isElectroDevice,isElectroNode,isHeatDevice,isHeatNode} = useSelector((state:StateSchema)=>state.deviceList);
    const dispatch = useAppDispatch();
    const {entities,selectedDeviceID} = useSelector((state:StateSchema)=>state.heatDevices);
    const {selectedDevice:selectedElectroDevice,data:electroData} = useSelector((state:StateSchema)=>state.electroDevices);
    const {heatNodes}=useSelector((state:StateSchema)=>state.heatNodes);
    const [tabSelected,setTabSelected] = useState(true);
    const [generalSelected,setGeneralSelected] = useState(false);
    const {isAuth} = useSelector((state:StateSchema)=>state.user);
    const heatDevRef = useRef<HeatDevice>();
    const electroDevRef = useRef<TopLevelElectroDevice>();
    const nodeRef = useRef<HeatNodeResponse>();
    heatDevRef.current=currentHeatDevice;
    electroDevRef.current=currentElectroDevice;
    nodeRef.current = currentHeatNode ?? currentElectroNode ;
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
    const updateCurrentDevice =  async (device:HeatDevice)=>{
        if (heatDevRef?.current?.id) {
            if (device.id===heatDevRef.current.id) {
                dispatch(heatDeviceSlice.actions.updateOne(device));
                dispatch(deviceListSlice.actions.setHeatDevice(device));
            }
        }
        if (nodeRef.current) {
            if (device.id===nodeRef.current.id){
                dispatch(deviceListSlice.actions.setHeatNode(device));
            }
        }
        console.log("после апдейта");

    };
    const updateCurrentElectroDevice =  async (device:ElectroNodeData)=>{
        if (electroDevRef?.current?.id) {
            if (device.id===electroDevRef.current.id) {
                // dispatch(electroDeviceActions.updateOne(device));
                dispatch(deviceListSlice.actions.setElectroNode(device));
            }
        }
        if (nodeRef.current) {
            if (device.id===nodeRef.current.id){
                dispatch(deviceListSlice.actions.setElectroNode(device));
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
                        {currentObject===undefined && !isElectroDevice && !isHeatDevice && !isElectroNode && !isHeatNode && currentCategory===undefined && null}
                        {currentCategory!==undefined && 
                        <ObjectCategoryView 
                            categoryClickHandler={categoryClickHandler}
                            objectClickHandler={objectClickHandler}
                            category={currentCategory}
                        /> }
                        {currentObject!==undefined &&
                        <ObjectDetail obj={currentObject}>
                            <AppButon theme={AppButtonTheme.OUTLINE} onClick={()=>dispatch(deviceListSlice.actions.setHeatNode(heatNodes.filter(hnode=> hnode.user_object===currentObject.id)[0]))}>Открыть УУТЭ</AppButon>
                            <MockComponent/>
                        </ObjectDetail>}
                        {isHeatDevice &&  
                        <HeatDeviceDetailView device={currentHeatDevice}>
                            <ManualHeatPoll onUpdate={updateCurrentDevice} device={currentHeatDevice}/>
                        </HeatDeviceDetailView> }
                        {isElectroDevice &&  
                        <ElectroCounterDeviceDetail device={currentElectroDevice}>
                            <ElectroDevicePoll device={currentElectroDevice} onUpdate={updateCurrentElectroDevice}  />

                            {/* <ManualHeatPoll onUpdate={updateCurrentDevice} device={currentElectroDevice}/> */}
                        </ElectroCounterDeviceDetail> }
                        {isElectroNode &&  
                        <ElectroNodeDetail>
                            {
                                electroData.topLevelDevices.map((el)=>
                                    <ElectroCounterDeviceDetail key={el.id} device={el}>
                                        <ElectroDevicePoll device={el} onUpdate={updateCurrentElectroDevice}  />
                                        {/* <ManualHeatPoll onUpdate={updateCurrentDevice} device={currentElectroDevice}/> */}
                                    </ElectroCounterDeviceDetail>)
                            }
                            
                        </ElectroNodeDetail> }
                        {isHeatNode &&
                            <HeatNodeDetailView key={currentHeatNode.id} heatNode={currentHeatNode}>
                                <ManualBulkHeatPolll onUpdate={()=>console.log("обновлено")} node_id={currentHeatNode.id} />

                                {Object.values(entities).map(device=>device.node===currentHeatNode?.id && 
                                <div className={cls.nodeCont} key={device.id}>
                                    <HeatDeviceDetailView className={cls.toDevice} key={device.id} device={device}>
                                        <ManualHeatPoll  nodePolling onUpdate={updateCurrentDevice} device={device} />
                                    </HeatDeviceDetailView>
                                </div>)}
                            </HeatNodeDetailView> }
                    </DetailView>
                    {/* <DetailView/> */}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
