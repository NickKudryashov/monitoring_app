
import { EntityId } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { CategoryItem, categorySlice } from "entities/Category";
import {  HeatDevice, HeatDeviceDetailView } from "entities/Heatcounters";
import { heatDeviceSlice, selectHeatDeviceById } from "entities/Heatcounters/reducers/reducer";
import { HeatNodeDetailView, HeatNodeResponse } from "entities/HeatNodes";
import { heatNodeSlice } from "entities/HeatNodes/reducers/reducers";
import { ObjectDetail, ObjectItem, objectSlice } from "entities/Objects";
import { GeneralInformation } from "features/GeneralInformation";
import { ManualBulkHeatPolll, ManualHeatPoll } from "features/ManualHeatPoll";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";
import { Modal } from "shared/ui/Modal/Modal";
import { DetailView } from "widgets/DetailView";
import { CurrentDevice, DeviceList, deviceListSlice } from "widgets/DeviceList";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import cls from "./MainPage.module.scss";
const MainPage = () => {
    const {currentObject,currentNode,currentCategory} = useSelector((state:StateSchema)=>state.deviceList);
    const dispatch = useAppDispatch();
    const {entities,selectedDeviceID} = useSelector((state:StateSchema)=>state.heatDevices);
    const {heatNodes}=useSelector((state:StateSchema)=>state.heatNodes);
    const [tabSelected,setTabSelected] = useState(true);
    const [generalSelected,setGeneralSelected] = useState(false);
    const {isAuth} = useSelector((state:StateSchema)=>state.user);
    const devRef = useRef<EntityId>();
    const nodeRef = useRef<HeatNodeResponse>();
    devRef.current=selectedDeviceID;
    nodeRef.current = currentNode;
    const currentDevice = useSelector((state:StateSchema)=>selectHeatDeviceById(state,selectedDeviceID));
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
    const updateCurrentDevice =  async (device:HeatDevice | HeatNodeResponse)=>{
        if (devRef.current) {
            if (device.id===devRef.current) {
                // @ts-ignore

                dispatch(heatDeviceSlice.actions.updateOne(device));
                // @ts-ignore
                dispatch(deviceListSlice.actions.setDevice(device));
            }
        }
        if (nodeRef.current) {
            if (device.id===nodeRef.current.id){
                dispatch(deviceListSlice.actions.setNode(device));
            }
        }
        console.log("после апдейта");

    };
    const updateCurrentNode =  async (node:HeatNodeResponse)=>{

        if (node.id===nodeRef.current.id) {
            dispatch(deviceListSlice.actions.setNode(node));
        }
    };
    return (
        <div className={cls.MainPage}>
            <Navbar/>
            <div className={cls.sidebarwrapper}>
                <div className={cls.content}>
                    <div className={cls.listWithGeneral}>
                        <AppButon className={cls.generalInfoBtn} onClick={()=>{dispatch(categorySlice.actions.closeAllCat());setGeneralSelected(true);}}>Общая информация</AppButon>
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
                        {currentObject===undefined && currentDevice===undefined && currentNode===undefined && currentCategory===undefined && null}
                        {currentObject===undefined && currentDevice===undefined && currentNode===undefined && currentCategory!==undefined && 
                        <ObjectCategoryView 
                            categoryClickHandler={categoryClickHandler}
                            objectClickHandler={objectClickHandler}
                            category={currentCategory}
                        /> }
                        {currentObject!==undefined && currentDevice===undefined && currentNode===undefined && currentCategory===undefined &&
                        <ObjectDetail obj={currentObject}>
                            <AppButon theme={AppButtonTheme.OUTLINE} onClick={()=>dispatch(deviceListSlice.actions.setNode(heatNodes.filter(hnode=> hnode.user_object===currentObject.id)[0]))}>Открыть УУТЭ</AppButon>
                            <MockComponent/>
                        </ObjectDetail>}
                        {currentObject===undefined && currentDevice!==undefined && currentNode===undefined && currentCategory===undefined &&
                        <HeatDeviceDetailView device={currentDevice}>
                            <ManualHeatPoll onUpdate={updateCurrentDevice} device={currentDevice}/>
                        </HeatDeviceDetailView> }
                        {currentObject===undefined && currentDevice===undefined && currentNode!==undefined && currentCategory===undefined &&
                        <HeatNodeDetailView key={currentNode.id} heatNode={currentNode}>
                            <ManualBulkHeatPolll onUpdate={()=>console.log("обновлено")} node_id={currentNode.id} />

                            {Object.values(entities).map(device=>device.node===currentNode?.id && 
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
