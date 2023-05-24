import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect } from "react";
import cls from "./ObjectPage.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { DeviceList } from "widgets/DeviceList";
import { ObjectDetail, objectsAllRequest } from "entities/Objects";
import { DetailView } from "widgets/DetailView";
import { Navbar } from "widgets/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { AppRoutesAuth, RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { useAppDispatch } from "shared/hooks/hooks";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Loader } from "shared/ui/Loader/Loader";
import { heatNodeAllRequest } from "entities/HeatNodes";

interface ObjectPageProps {
 className?: string;
}

const ObjectPage = memo((props: PropsWithChildren<ObjectPageProps>) => {
    const { className } = props;
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const navigate = useNavigate();
    const {id} = useParams<{id:string}>();
    const selectedObj = objects.filter((obj)=>obj.id===Number(id))[0];
    const {heatNodes} = useSelector((state:StateSchema)=>state.heatNodes);
    const {data} = useSelector((state:StateSchema)=>state.electroNodes);
    const objectNode = heatNodes.filter((node)=>node.user_object===Number(id))[0];
    const objectElNode = data?.filter((node)=>node.user_object===Number(id))[0];
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(objectsAllRequest());
        dispatch(heatNodeAllRequest());

    },[dispatch]);
    let content;
    if (!objectNode || !objectElNode){
        content = (
            <DetailView className={cls.detail}>
                <Loader/>
            </DetailView>
        );
    }
    
    if (objectNode && objectElNode){
        content = (
            <DetailView className={cls.detail}>
                <ObjectDetail obj={selectedObj}>
                    <MockComponent/>
                    <AppLink to={RoutePathAuth.heatnode+objectNode.id}>
                        <AppButon className={cls.nodeRedirectBtn} theme={AppButtonTheme.SHADOW}>Открыть УУТЭ</AppButon>
                    </AppLink>
                    <AppLink to={RoutePathAuth.electronode+objectElNode.id}>
                        <AppButon className={cls.nodeRedirectBtn} theme={AppButtonTheme.SHADOW}>Открыть АСКУЭ</AppButon>
                    </AppLink>
                </ObjectDetail>
            </DetailView>
        );
    }
    
    return (
        <MainLayout
            deviceList={<DeviceList/>}
            navbar={<Navbar/>}
            DetailView={content}
        />
    );
});
ObjectPage.displayName="objectPage";
export default ObjectPage;