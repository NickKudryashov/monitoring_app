import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect } from "react";
import cls from "./PumpDevicePage.module.scss";

import type { PropsWithChildren } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/hooks";
import { PumpDevice, fetchPumpDevice } from "entities/PumpDevice";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { Footer } from "shared/ui/Footer/Footer";
import { DetailView } from "widgets/DetailView";
import { Loader } from "shared/ui/Loader/Loader";

interface PumpDevicePageProps {
 className?: string;
}

const PumpDevicePage = memo((props: PropsWithChildren<PumpDevicePageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let content;
    const pumpDevices = useSelector((state:StateSchema)=>state.pumpDevices);
    useEffect(()=>{
        dispatch(fetchPumpDevice());
    },[dispatch]);
    if (!id) {
        navigate(RoutePathAuth.main,{replace:true});
    }
    const selectedDevice = pumpDevices.data.filter((el)=>el?.id===Number(id));
    if (selectedDevice.length===0){
        navigate(RoutePathAuth.main,{replace:true});
    }

    if (selectedDevice) {
        content = (
            <DetailView className={cls.detail}>
                <PumpDevice id={Number(id)}/>
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
            className={classNames(cls.HeatNodePage,{},[className])}
            navbar={<Navbar/>}
            deviceList={<DeviceList/>}
            DetailView={content}
            footer={<Footer/>}
        />
    );
});

export default PumpDevicePage;
