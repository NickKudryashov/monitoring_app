import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./ElectroNodePage.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { DetailView } from "widgets/DetailView";
import { ElectroNodeDetail } from "entities/ElectroNodes";
import { ElectroCounterDeviceDetail } from "entities/ElectroDevice";
import { Loader } from "shared/ui/Loader/Loader";
import $api, { API_URL } from "shared/api";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { ElectroDevicePoll } from "features/ElectroDevicePoll";

interface ElectroNodePageProps {
 className?: string;
}

const ElectroNodePage = (props: PropsWithChildren<ElectroNodePageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const intId = Number(id);
    const navigate = useNavigate();
    let content;
    if (!id) {
        navigate(RoutePathAuth.main);
    }
    const {data} = useSelector((state:StateSchema)=>state.electroNodes);
    const {data:electroDevData} = useSelector((state:StateSchema)=>state.electroDevices);
    const filteredNodes = data?.filter((node)=>node.id===intId);
    if (!filteredNodes?.length) {
        navigate(RoutePathAuth.main);
    }
    if (!data || !electroDevData){
        content = (
            <DetailView className={cls.detail}>
                <Loader/>
            </DetailView>
        );
    }
    else {
        content = (
            <DetailView className={cls.detail}>
                <ElectroNodeDetail polLFeature={<ElectroDevicePoll className={cls.deviceBtns} bulk node={filteredNodes[0]} onUpdate={()=>console.log("")}  />}>
                    
                    {
                        electroDevData.topLevelDevices.map((dev)=> dev.node===filteredNodes[0].id &&
                            <div className={cls.btnsWithDevice} key={dev.id}>
                                
                                <ElectroCounterDeviceDetail  
                                    key={dev.id} 
                                    id={dev.id} 
                                    featuresBlock={
                                        <div className={cls.deviceBtns}>
                                            <ElectroDevicePoll device={dev} onUpdate={()=>console.log("")}  />
                                            <AppButon className={cls.btn} theme={AppButtonTheme.SHADOW} onClick={()=>downloadXLSFile(dev)}>Сформировать отчет</AppButon>
                                            <AppButon className={cls.btn} theme={AppButtonTheme.SHADOW}>Выбрать сформированный отчет</AppButon>
                                        </div>}  />
                            </div>
                        )
                    }
                </ElectroNodeDetail>
            </DetailView>
        );
    }
    const downloadXLSFile = async (dev:TopLevelElectroDevice) => {
        const response = $api.post(`electro_report/${dev.id}`);
        fetch(`${API_URL}electro_report/${id}`,{method:"PUT",headers:{"Authorization":"Bearer "+localStorage.getItem("access_token")}}).then(
            response => {
                response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    console.log(url);
                    a.href = url;
                    a.download = `${dev.name}_${dev.device_type_verbose_name}_отчет.xlsx`;
                    a.click();
                    a.remove();
                });
            });
    };
    return (
        <MainLayout
            className={classNames(cls.ElectroNodePage,{},[className])}
            navbar={<Navbar/>}
            deviceList={<DeviceList/>}
            DetailView={content}
        />
    );
};

export default ElectroNodePage;