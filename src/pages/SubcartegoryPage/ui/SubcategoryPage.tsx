import classNames from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect } from "react";
import cls from "./SubcategoryPage.module.scss";

import type { PropsWithChildren } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/hooks";
import { fetchChildren, fetchDetail, fetchElectro, fetchHeat, fetchPump } from "../model/service/fetchContent";
import { DeviceList } from "widgets/DeviceList";
import { Navbar } from "widgets/Navbar";
import { Footer } from "shared/ui/Footer/Footer";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { DetailView } from "widgets/DetailView";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { ListItem, SubcategoryCard, fetchByObjId } from "entities/ObjectSubCategory";
import { HeatDeviceDetailView } from "entities/Heatcounters";
import { ElectroCounterDeviceDetail, fetchElectroDevices } from "entities/ElectroDevice";
import { PumpDevice } from "entities/PumpDevice";
import { AppRoutesAuth, RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { objectsAllRequest } from "entities/Objects";
import { deviceListActions } from "widgets/DeviceList/reducers/DeviceListReducer";
import { ManualBulkHeatPolll, ManualHeatPoll } from "features/ManualHeatPoll";
import { ElectroDevicePoll } from "features/ElectroDevicePoll";
import { subCatPageActions } from "../model/slice/SubcategoryPageSlice";
import { EventAnswer } from "shared/types/eventTypes";
import $api from "shared/api";

interface SubcategoryPageProps {
 className?: string;
}

const SubcategoryPage = (props: PropsWithChildren<SubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const numberID = Number(id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {entities,ids} = useSelector((state:StateSchema)=>state.objSubCat);
    const {currentSubcat} = useSelector((state:StateSchema)=>state.deviceList);
    const {electrocounter,heatcounters,pumps,subcats,current} = useSelector((state:StateSchema)=>state.subCatPage);
    // dispatch(fetchChildren(numberID));

    useEffect(()=>{
        if (!currentSubcat && current) {
            dispatch(fetchByObjId(current.user_object));
        }
    },[id]);
    

    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);
    

    useEffect(()=>{
        if (ids.length===0) {
            dispatch(fetchDetail(numberID)).then(res=>dispatch(fetchByObjId(current.user_object)));
        }
    },[current?.user_object, dispatch, ids.length, numberID]);
    // useEffect(()=>{
    //     if (!currentSubcat) {
    //         dispatch(fetchDetail(numberID)).then(res=>
    //             dispatch(fetchByObjId(current.user_object))
    //         ).then(res=>{
    //             if (current && !ids.includes(current.id)) {
    //                 navigate(RoutePathAuth.object+current.user_object);
    //                 console.log("текущего айди нет в общих айди категории, перенаправление на мейн");
    //                 console.log("список доступных: ",ids);
    //                 console.log("требуемый: ",id);
    //             }
    //         });
    //     }
       
        
    // },[current, currentSubcat, dispatch, id, ids, navigate, numberID]);

    //редирект если айди отсутствует, идут перерисовки бесконечные
    useEffect(()=>{
        dispatch(subCatPageActions.removeElectro());
        dispatch(subCatPageActions.removeHeat());
        dispatch(subCatPageActions.removePumps());
        dispatch(fetchDetail(numberID));
        // dispatch(fetchElectroDevices());
        dispatch(fetchChildren(numberID));
        dispatch(fetchHeat(numberID));
        dispatch(fetchElectro(numberID));
        dispatch(fetchPump(numberID));
        // dispatch(objectsAllRequest());
        dispatch(deviceListActions.setSubcat(numberID));

    },[dispatch, numberID]);
    
    const updateHeatDevice = ()=> {
        dispatch(fetchHeat(numberID));
    };


    const content = (
        <DetailView className={cls.detail}>
            <p>{current ? "Категория "+current.name : "Загрузка"}</p>
            {/* {heatcounters.length>0 && <ManualBulkHeatPolll  catID={numberID} onUpdate={()=>dispatch(fetchHeat(numberID))}   />} */}
            {/* {electrocounter.length>0 && <ElectroDevicePoll catID={numberID} onUpdate={()=>dispatch(fetchElectro(numberID))} bulk />} */}
            {subcats && subcats.map((el)=>
                <SubcategoryCard onClick={()=>{navigate(RoutePathAuth.subcat+el.id);localStorage.setItem("subcategory_"+el.id,"1");}} key={el.id} catID={el.id} />
            ) 
            }
            {heatcounters.length && heatcounters.map((el)=> el.subcategory===numberID &&
                <HeatDeviceDetailView key={el.id} device={el}>
                    <ManualHeatPoll onUpdate={updateHeatDevice} device={el}/>
                </HeatDeviceDetailView>
            ) 
            }
            {electrocounter && electrocounter.map((el)=> el.subcategory===numberID && 
                <ElectroCounterDeviceDetail key={el.id} id={el.id}>
                    {/* <ElectroDevicePoll device={el} onUpdate={()=>dispatch(fetchElectro(numberID))}  /> */}
                </ElectroCounterDeviceDetail>
            ) 
            }
            {pumps && pumps.map((el)=> el.subcategory===numberID && 
                <PumpDevice key={el.id} id={el.id} />
            ) 
            }
        </DetailView>
    );
    const onMove = ()=>{
        if (!ids.includes(id)) {
            if (current.parent) {
                navigate(RoutePathAuth.subcat+current.parent);
            }
            else {
                navigate(RoutePathAuth.object+current.user_object);
            }
            dispatch(subCatPageActions.removeCurrent());
        }
        else {
            dispatch(fetchChildren(numberID));
        }
    };
    return (
        <MainLayout className={classNames(cls.SubcategoryPage,{},[])}
            deviceList={<DeviceList onSubCatMove={onMove}/>}
            navbar={<Navbar/>}
            DetailView={content}
            footer={<Footer pollCallback={fetchEvents}/>}
        />
    );
};

export default SubcategoryPage;
