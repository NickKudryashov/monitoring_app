import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect, useRef } from "react";
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
import { Footer } from "shared/ui/Footer/Footer";
import { fetchPumpStationNode } from "entities/PumpStationNode";
import { fetchPumpDevice } from "entities/PumpDevice";
import { fetchElectroDevices } from "entities/ElectroDevice";
import HeatDeviceService from "entities/Heatcounters/service/HeatDeviceService";
import { getDevices } from "entities/Heatcounters";
import { TelegramChat } from "entities/TelegramChat/model/types/ChatSchema";
import { Chat, chatActions } from "entities/TelegramChat";
import { fetchMessages } from "entities/TelegramChat/model/services/telegramChatActions";

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
    const {data:pumpData} = useSelector((state:StateSchema)=>state.pumpNodes);
    const objectNode = heatNodes?.filter((node)=>node.user_object===Number(id))[0];
    const objectElNode = data?.filter((node)=>node.user_object===Number(id))[0];
    const objectPumpNode = pumpData?.filter((node)=>node?.user_object===Number(id))[0];
    const {chats,isLoading} = useSelector((state:StateSchema)=>state.chats);
    let currentChat:TelegramChat;
    const chatRef = useRef<TelegramChat | null>();
    
    // console.log(chatArray,chatAvailable,currentChat);

    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(objectsAllRequest());
        dispatch(fetchPumpStationNode());
        dispatch(heatNodeAllRequest());
        dispatch(fetchPumpStationNode());
        const chatArray = chats.filter((el)=>el.objects.includes(Number(id)));
        const chatAvailable = chatArray.length;
        if (chatAvailable) {
            chatRef.current = chats.filter((el)=>el.objects.includes(Number(id)))[0];
            console.log("чат сменился на ",chatRef.current.id);
        }
        // dispatch(chatActions.setIsLoading(true));
    },[chats, dispatch, id]);
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
                <ObjectDetail className={cls.obj} obj={selectedObj}>
                    <div className={cls.chatWithBtns}>
                        <div className={cls.objBtns}>
                            {objectNode?.count > 0 &&
                            <AppLink to={RoutePathAuth.heatnode+objectNode.id}>
                                <AppButon className={cls.nodeRedirectBtn} theme={AppButtonTheme.OUTLINE}>ИТП</AppButon>
                            </AppLink>}
                            {
                                objectPumpNode?.count>0 && 
                                <AppLink to={RoutePathAuth.pumpnode+objectPumpNode?.id}>
                                    <AppButon className={cls.nodeRedirectBtn} theme={AppButtonTheme.OUTLINE}>ПНС ХВС</AppButon>
                                </AppLink>
                            }
                            {
                                objectElNode?.count>0 && 
                                <AppLink to={RoutePathAuth.electronode+objectElNode.id}>
                                    <AppButon className={cls.nodeRedirectBtn} theme={AppButtonTheme.OUTLINE}>АСКУЭ</AppButon>
                                </AppLink>
                            }
                        </div>
                        {chatRef.current && <Chat currentChat={chatRef.current} obj_id={Number(id)} />}
                    </div>
                </ObjectDetail>

            </DetailView>
        );
    }
    
    return (
        <MainLayout
            deviceList={<DeviceList/>}
            navbar={<Navbar/>}
            DetailView={content}
            footer={<Footer/>}
        />
    );
});
ObjectPage.displayName="objectPage";
export default ObjectPage;