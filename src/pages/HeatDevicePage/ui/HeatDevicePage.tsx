import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
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

interface HeatDevicePageProps {
 className?: string;
}

const HeatDevicePage = (props: PropsWithChildren<HeatDevicePageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const {entities} = useSelector((state:StateSchema)=>state.heatDevices);
    const navigate = useNavigate();
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
                <HeatDeviceDetailView device={dev[0]}>
                    <ManualHeatPoll onUpdate={()=>console.log("")} device={dev[0]} />
                    <AppButon className={cls.mockBtn} theme={AppButtonTheme.SHADOW}>Снять архив</AppButon>
                    <AppButon className={cls.mockBtn} theme={AppButtonTheme.SHADOW}>Сформировать архив</AppButon>
                    <AppButon className={cls.mockBtn} theme={AppButtonTheme.SHADOW}>Скачать архив</AppButon>
                    <AppButon className={cls.mockBtn} theme={AppButtonTheme.SHADOW}>Выбрать сохраненный архив</AppButon>
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
        <MainLayout
            className={classNames(cls.HeatDevicePage,{},[className])}
            navbar={<Navbar/>}
            deviceList={<DeviceList/>}
            DetailView={content}
        />
    );
};


export default HeatDevicePage;