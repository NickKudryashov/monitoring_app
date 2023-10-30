import { memo, useEffect } from "react";
import cls from "./ObjectPage.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { DeviceList, deviceListSlice } from "widgets/DeviceList";
import { ObjectDetail, objectsAllRequest } from "entities/Objects";
import { DetailView } from "widgets/DetailView";
import { Navbar } from "widgets/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { Loader } from "shared/ui/Loader/Loader";
import { Footer } from "shared/ui/Footer/Footer";
import { TelegramChat } from "entities/TelegramChat/model/types/ChatSchema";
import { Chat } from "entities/TelegramChat";
import { SubcategoryCard, fetchByObjId } from "entities/ObjectSubCategory";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { HeatDeviceDetailView } from "entities/Heatcounters";
import { getElectroDeviceData } from "entities/ElectroDevice";

interface ObjectPageProps {
 className?: string;
}

const ObjectPage = memo((props: PropsWithChildren<ObjectPageProps>) => {
    const { className } = props;
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const navigate = useNavigate();
    const {id} = useParams<{id:string}>();
    const selectedObj = objects.filter((obj)=>obj.id===Number(id))[0];
    const {chats,isLoading} = useSelector((state:StateSchema)=>state.chats);
    const {entities} = useSelector((state:StateSchema)=>state.objSubCat);
    let currentChat:TelegramChat;
    const chatArray = chats.filter((el)=>el.objects.includes(Number(id)));
    const chatAvailable = chatArray.length;
    if (chatAvailable) {
        currentChat = chats.filter((el)=>el.objects.includes(Number(id)))[0];
    }
    const dispatch = useAppDispatch();
    useEffect(()=>{
        // dispatch(objectsAllRequest());
        // dispatch(deviceListSlice.actions.setObject(selectedObj));
        dispatch(fetchByObjId(Number(id)));
        // dispatch(chatActions.setIsLoading(true));
    },[dispatch, id]);
    const content = (
        <DetailView className={cls.detail}>
            <ObjectDetail className={cls.obj} obj={selectedObj}>
                <div className={cls.chatWithBtns}>
                    <div className={cls.subcats}>
                        {Object.values(entities).map((el)=> el.user_object===Number(id) && el.parent===null && 
                        <SubcategoryCard onClick={()=>{navigate(RoutePathAuth.subcat+el.id);localStorage.setItem("subcategory_"+el.id,"1");}} key={el.id} catID={el.id} />
                        )}
                    </div>
                    {currentChat && chatAvailable && <Chat obj_id={Number(id)} />}
                </div>
            </ObjectDetail>
        </DetailView>
    );
    
    return (
        // <MainLayout
        //     deviceList={<DeviceList/>}
        //     navbar={<Navbar/>}
        //     DetailView={content}
        //     footer={<Footer/>}
        // />
        <div className={cls.ObjectPage}>
        {content}
        </div>
    );
});
ObjectPage.displayName="objectPage";
export default ObjectPage;