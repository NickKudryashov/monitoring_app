import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect, useState } from "react";
import cls from "./HeatNodePage.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { useNavigate, useParams } from "react-router-dom";
import { HeatNodeDetailView, heatNodeAllRequest } from "entities/HeatNodes";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { DetailView } from "widgets/DetailView";
import { HeatDeviceDetailView } from "entities/Heatcounters";
import { useAppDispatch } from "shared/hooks/hooks";
import { ManualBulkHeatPolll, ManualHeatPoll } from "features/ManualHeatPoll";
import { Loader } from "shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { HeatArchives } from "features/HeatArchives";
import { Footer } from "shared/ui/Footer/Footer";

interface HeatNodePageProps {
 className?: string;
}

const HeatNodePage = (props: PropsWithChildren<HeatNodePageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {heatNodes} = useSelector((state:StateSchema)=>state.heatNodes);
    const [archivesOpen,setArchivesOpen] = useState(false);
    const [currentDevice,setCurrentDevice] = useState<number>();
    useEffect(()=>{
        dispatch(heatNodeAllRequest());
    },[dispatch]);
    if (!id) {
        navigate(RoutePathAuth.main,{replace:true});
    }
    const selectedNode = heatNodes.filter((el)=>el.id===Number(id));
    if (selectedNode.length===0){
        navigate(RoutePathAuth.main,{replace:true});
    }

    const updateCurrentDevice = ()=>{
        console.log("Обновлен прибор");
    };
    let content;
    const {entities} = useSelector((state:StateSchema)=>state.heatDevices);
    console.log(entities);
    if (selectedNode && heatNodes && entities){
        content = (
            <DetailView className={cls.detail}>
                <HeatNodeDetailView heatNode={selectedNode[0]} pollFeature={<ManualBulkHeatPolll className={cls.nodeBtn} onUpdate={updateCurrentDevice} node_id={Number(id)} />}>
                    {currentDevice && <HeatArchives is_open={archivesOpen} onClose={()=>setArchivesOpen(false)} dev_id={currentDevice}/>}
                    {Object.values(entities).map((device)=>
                        device.node===Number(id) &&
                        <div className={cls.nodeCont} key={device.id}>
                            <HeatDeviceDetailView className={cls.toDevice} key={device.id} device={device}>
                                <ManualHeatPoll className={cls.nodeBtn} onUpdate={updateCurrentDevice} device={device} />
                                <AppButon onClick={()=>{setCurrentDevice(device.id);setArchivesOpen(true);}} className={cls.mockBtn} theme={AppButtonTheme.SHADOW}>Управление архивами</AppButon>
                            </HeatDeviceDetailView>
                        </div>
                    )}
                </HeatNodeDetailView>
            </DetailView>
        );
    }
    else {
        content = (
            <DetailView className={cls.detail}>
                <Loader/>
            </DetailView>);
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
};

export default HeatNodePage;