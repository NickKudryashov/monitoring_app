
import { CategoryItem, categorySlice } from "entities/Category";
import { HeatDevice, HeatDeviceDetailView } from "entities/Heatcounters";
import { HeatNodeDetailView } from "entities/HeatNodes";
import { ObjectDetail, ObjectItem, objectSlice } from "entities/Objects";
import { GeneralInformation } from "features/GeneralInformation";
import { ManualBulkHeatPolll, ManualHeatPoll } from "features/ManualHeatPoll";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import { Modal } from "shared/ui/Modal/Modal";
import { DetailView } from "widgets/DetailView";
import { CurrentDevice, DeviceList, deviceListSlice } from "widgets/DeviceList";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import cls from "./MainPage.module.scss";
const MainPage = () => {
    const {currentObject,currentDevice,currentNode,currentCategory} = useAppSelector(state=>state.deviceListReducer);
    const dispatch = useAppDispatch();
    const {devices} = useAppSelector(state=>state.heatDeviceReducer);
    const {heatNodes}=useAppSelector(state=>state.heatNodeReducer);
    const [tabSelected,setTabSelected] = useState(true);
    const [generalSelected,setGeneralSelected] = useState(false);
    const {isAuth} = useAppSelector(state=>state.userReducer);
    const devRef = useRef<CurrentDevice>();
    devRef.current=currentDevice;



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
        if (device.id===devRef.current.id) {
            dispatch(deviceListSlice.actions.setDevice(device));
        }
    };
    return (
        <div className={cls.MainPage}>
            <Navbar/>
            <div className={cls.sidebarwrapper}>
                <div className={cls.content}>
                    <div className={cls.listWithGeneral}>
                        <AppButon theme={AppButtonTheme.PRIMARY} onClick={()=>setGeneralSelected(true)}>Общая информация</AppButon>
                        <DeviceList
                            onClick={()=>{setTabSelected(false);setGeneralSelected(false);}}
                        />
                    </div>
                    <DetailView
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
                            {heatNodes.map(hnode=> hnode.user_object===currentObject.id &&
                            <HeatNodeDetailView key={hnode.id} heatNode={hnode}>
                                <ManualBulkHeatPolll onUpdate={()=>console.log("обновлено")} node_id={hnode.id} />
                                {devices.map(device=> device.node===hnode.id && <HeatDeviceDetailView key={device.id} device={device}/>)}
                            </HeatNodeDetailView>)}
                        </ObjectDetail>}
                        {currentObject===undefined && currentDevice!==undefined && currentNode===undefined && currentCategory===undefined &&<HeatDeviceDetailView device={currentDevice}><ManualHeatPoll onUpdate={updateCurrentDevice} device={currentDevice}/></HeatDeviceDetailView> }
                        {currentObject===undefined && currentDevice===undefined && currentNode!==undefined && currentCategory===undefined &&
                        <HeatNodeDetailView heatNode={currentNode}>
                            <ManualBulkHeatPolll onUpdate={()=>console.log("обновлено")} node_id={currentNode.id} />
                            {devices.map(device=>device.node===currentNode.id && <div className={cls.nodeCont} key={currentNode.id}><HeatDeviceDetailView className={cls.toDevice} key={device.id} device={device}><ManualHeatPoll onUpdate={updateCurrentDevice} device={device} /></HeatDeviceDetailView></div>)}
                        </HeatNodeDetailView> }
                    </DetailView>
                    {/* <DetailView/> */}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
