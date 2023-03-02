
import { CategoryItem, categorySlice } from "entities/Category";
import { HeatDevice, HeatDeviceDetailView } from "entities/Heatcounters";
import { HeatNodeDetailView } from "entities/HeatNodes";
import { ObjectDetail, ObjectItem, objectSlice } from "entities/Objects";
import { ManualHeatPoll } from "features/ManualHeatPoll";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
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
    const {isAuth} = useAppSelector(state=>state.userReducer);
    const devRef = useRef<CurrentDevice>();
    devRef.current=currentDevice;



    const objectClickHandler = (obj:ObjectItem) => {
        dispatch(objectSlice.actions.closeAllObjExceptSelected(obj));
        dispatch(deviceListSlice.actions.setObject(obj));
    };
    const categoryClickHandler = (cat:CategoryItem)=>{
        dispatch(categorySlice.actions.openCat(cat.id));
        dispatch(categorySlice.actions.closeAllCatsExceptSelected(cat));
        dispatch(deviceListSlice.actions.setCategory(cat));
        dispatch(objectSlice.actions.closeAllObjByCategoryId(cat.id));
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
                <Sidebar/>
                <div className={cls.content}>
                    <DeviceList
                        onClick={()=>setTabSelected(false)}
                    />
                    <DetailView
                        tabSelected={tabSelected}
                        setTabSelected={setTabSelected}
                    >
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
                                {devices.map(device=> device.node===hnode.id && <HeatDeviceDetailView key={device.id} device={device}/>)}
                            </HeatNodeDetailView>)}
                        </ObjectDetail>}
                        {currentObject===undefined && currentDevice!==undefined && currentNode===undefined && currentCategory===undefined &&<HeatDeviceDetailView device={currentDevice}><ManualHeatPoll onUpdate={updateCurrentDevice} device={currentDevice}/></HeatDeviceDetailView> }
                        {currentObject===undefined && currentDevice===undefined && currentNode!==undefined && currentCategory===undefined &&
                        <HeatNodeDetailView heatNode={currentNode}>
                            {devices.map(device=>device.node===currentNode.id && <HeatDeviceDetailView key={device.id} device={device}></HeatDeviceDetailView>)}
                        </HeatNodeDetailView> }
                    </DetailView>
                    {/* <DetailView/> */}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
