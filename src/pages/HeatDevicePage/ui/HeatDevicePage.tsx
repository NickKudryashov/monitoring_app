import classNames from "shared/lib/classNames/classNames";
import { memo, useCallback, useState } from "react";
import cls from "./HeatDevicePage.module.scss";

import type { PropsWithChildren } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { HeatDeviceDetailView } from "entities/Heatcounters";
import { DetailView } from "widgets/DetailView";
import { ManualHeatPoll } from "features/ManualHeatPoll";
import { Loader } from "shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { HeatArchives } from "features/HeatArchives";
import { Footer } from "shared/ui/Footer/Footer";
import $api from "shared/api";
import { EventAnswer } from "shared/types/eventTypes";

interface HeatDevicePageProps {
 className?: string;
}


const HeatDevicePage = (props: PropsWithChildren<HeatDevicePageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const {entities} = useSelector((state:StateSchema)=>state.heatDevices);
    const navigate = useNavigate();
    const [open,setIsOpen] = useState(false);

    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("heat_events/"+id);
        return response.data;
    },[id]);
    const onClose = ()=>{
        setIsOpen(false);
    };

    let content;
    if (!id) {
        navigate(RoutePathAuth.main);
    }
    const dev = Object.values(entities)?.filter((device)=>device.id===Number(id));
    if (!dev.length){
        navigate(RoutePathAuth.main);
    }
    if (entities && dev?.length){
        content = (
            <DetailView className={cls.detail}>
                <HeatDeviceDetailView id={String(dev[0].id)}>
                    <HeatArchives is_open={open} onClose={onClose} dev_id={Number(id)}/>
                    <ManualHeatPoll onUpdate={()=>console.log("")} device={dev[0]} />
                    {/* <AppButon className={cls.mockBtn} theme={AppButtonTheme.SHADOW}>Снять архив</AppButon> */}
                    <AppButon onClick={()=>setIsOpen(true)} className={cls.mockBtn} theme={AppButtonTheme.SHADOW}>Управление архивами</AppButon>
                </HeatDeviceDetailView>
            </DetailView>
        );
    }
    else {
        content = (
            <DetailView className={cls.detail}>
                <Loader/>
            </DetailView>
        );
    }
    
    return (
        // <MainLayout
        //     className={classNames(cls.HeatDevicePage,{},[className])}
        //     navbar={<Navbar/>}
        //     deviceList={<DeviceList/>}
        //     DetailView={content}
        //     footer={<Footer pollCallback={fetchEvents}/>}
        // />
        <div className={classNames(cls.HeatDevicePage,{},[className])}>
            {content}
        </div>
    );
};


export default HeatDevicePage;