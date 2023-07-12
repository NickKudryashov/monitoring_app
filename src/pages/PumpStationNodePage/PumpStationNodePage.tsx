import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect } from "react";
import cls from "./PumpStationNodePage.module.scss";

import type { PropsWithChildren } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/hooks";
import { useSelector } from "react-redux";
import { PumpDevice, fetchPumpDevice } from "entities/PumpDevice";
import { PumpStationNode, fetchPumpStationNode } from "entities/PumpStationNode";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { DetailView } from "widgets/DetailView";
import { Loader } from "shared/ui/Loader/Loader";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { Footer } from "shared/ui/Footer/Footer";

interface PumpStationNodePageProps {
 className?: string;
}

const PumpStationNodePage = (props: PropsWithChildren<PumpStationNodePageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let content;
    const pumpNodes = useSelector((state:StateSchema)=>state.pumpNodes);
    const pumpDevices = useSelector((state:StateSchema)=>state.pumpDevices);
    useEffect(()=>{
        dispatch(fetchPumpStationNode());
        dispatch(fetchPumpDevice());

    },[dispatch]);
    if (!id) {
        navigate(RoutePathAuth.main,{replace:true});
    }
    const selectedNode = pumpNodes?.data?.filter((el)=>el?.id===Number(id));
    if (selectedNode.length===0){
        navigate(RoutePathAuth.main,{replace:true});
    }

    if (selectedNode && pumpNodes.data && pumpDevices.data) {
        content = (
            <DetailView className={cls.detail}>
                <PumpStationNode>
                    {pumpDevices?.data?.map((dev)=>(
                        dev.node===Number(id) &&
                        <PumpDevice key={dev.id} id={dev.id}/>
                    ))}
                </PumpStationNode>
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
};
export default PumpStationNodePage;