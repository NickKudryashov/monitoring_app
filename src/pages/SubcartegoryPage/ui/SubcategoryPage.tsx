import classNames from "shared/lib/classNames/classNames";
import { memo, useCallback, useEffect, useState } from "react";
import cls from "./SubcategoryPage.module.scss";

import type { PropsWithChildren } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/hooks";
import { fetchAuto, fetchChildren, fetchDetail, fetchElectro, fetchHeat, fetchPump } from "../model/service/fetchContent";
import { DeviceList } from "widgets/DeviceList";
import { Navbar } from "widgets/Navbar";
import { Footer } from "shared/ui/Footer/Footer";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { DetailView } from "widgets/DetailView";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { SubcategoryCard, fetchByObjId } from "entities/ObjectSubCategory";
import { HeatDeviceDetailView } from "entities/Heatcounters";
import { ElectroCounterDeviceDetail } from "entities/ElectroDevice";
import { PumpDevice } from "entities/PumpDevice";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { deviceListActions } from "widgets/DeviceList/reducers/DeviceListReducer";
import { subCatPageActions } from "../model/slice/SubcategoryPageSlice";
import { EventAnswer } from "shared/types/eventTypes";
import $api from "shared/api";
import { AutoDevDetail } from "entities/AutomaticDevice";
import { HeatArchives } from "features/HeatArchives";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";

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
    const {electrocounter,heatcounters,pumps,subcats,current,autos} = useSelector((state:StateSchema)=>state.subCatPage);
    const [isOpen,setIsOpen] = useState(false)
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
        dispatch(subCatPageActions.removeAutos());
        dispatch(fetchDetail(numberID));
        // dispatch(fetchElectroDevices());
        dispatch(fetchChildren(numberID));
        dispatch(fetchHeat(numberID));
        dispatch(fetchElectro(numberID));
        dispatch(fetchPump(numberID));
        dispatch(fetchAuto(numberID));
        // dispatch(objectsAllRequest());
        dispatch(deviceListActions.setSubcat(numberID));

    },[dispatch, numberID,id]);
    
    const updateHeatDevice = ()=> {
        dispatch(fetchHeat(numberID));
    };


    const content = (
        <DetailView className={cls.detail}>
            <p>{current ? "Категория "+current.name : "Загрузка"}</p>
            {/* {heatcounters.length>0 && <ManualBulkHeatPolll  catID={numberID} onUpdate={()=>dispatch(fetchHeat(numberID))}   />} */}
            {/* {electrocounter.length>0 && <ElectroDevicePoll catID={numberID} onUpdate={()=>dispatch(fetchElectro(numberID))} bulk />} */}
            {heatcounters && heatcounters.map((el)=> 
                <HeatDeviceDetailView key={el} id={String(el)}>
                    {/* <ManualHeatPoll onUpdate={updateHeatDevice} device={el}/> */}
                    <AppButon theme={AppButtonTheme.SHADOW} onClick={()=>setIsOpen(true)}>Открыть архивы</AppButon>
                    <HeatArchives dev_id={el} is_open={isOpen} onClose={()=>setIsOpen(false)}  />
                </HeatDeviceDetailView>
            ) 
            }
            {electrocounter && electrocounter.map((el)=>
                <ElectroCounterDeviceDetail key={el} id={el}>
                    {/* <ElectroDevicePoll device={el} onUpdate={()=>dispatch(fetchElectro(numberID))}  /> */}
                </ElectroCounterDeviceDetail>
            ) 
            }
            {pumps && pumps.map((el)=>
                <PumpDevice key={el} id={el} />
            ) 
            }
            {autos && autos.map((el)=>
                <AutoDevDetail key={el} id={String(el)} />
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
        // <MainLayout className={classNames(cls.SubcategoryPage,{},[])}
        //     deviceList={<DeviceList onSubCatMove={onMove}/>}
        //     navbar={<Navbar/>}
        //     DetailView={content}
        //     footer={<Footer pollCallback={fetchEvents}/>}
        // />
        <div  className={classNames(cls.SubcategoryPage,{},[])}>
            {content}
        </div>
    );
};

export default SubcategoryPage;
