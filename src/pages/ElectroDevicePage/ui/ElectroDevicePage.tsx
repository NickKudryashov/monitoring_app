import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./ElectroDevicePage.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { DetailView } from "widgets/DetailView";
import { Loader } from "shared/ui/Loader/Loader";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { ElectroCounterDeviceDetail } from "entities/ElectroDevice";
import { ElectroDevicePoll } from "features/ElectroDevicePoll";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import $api, { API_URL } from "shared/api";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";

interface ElectroDevicePageProps {
 className?: string;
}

const ElectroDevicePage = memo((props: PropsWithChildren<ElectroDevicePageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const {data} = useSelector((state:StateSchema)=>state.electroDevices);
    const navigate = useNavigate();
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
    let content;
    let device:TopLevelElectroDevice[];
    if (!id || !data?.topLevelDevices) {
        content = (
            <DetailView className={cls.detail}>
                <Loader/>
            </DetailView>
        );
    }
    else {
        device = data.topLevelDevices.filter((dev)=>dev.id===Number(id));
        if (!device.length) {
            navigate(RoutePathAuth.main);
        }
        else {
            content = (
                <DetailView className={cls.detail}>
                    <div className={cls.btnsWithDevice} key={device[0].id}>
                        <div className={cls.deviceBtns}>
                            <ElectroDevicePoll device={device[0]} onUpdate={()=>console.log("")}  />
                            <AppButon theme={AppButtonTheme.SHADOW} onClick={()=>downloadXLSFile(device[0])}>Сформировать отчет</AppButon>
                            <AppButon theme={AppButtonTheme.SHADOW}>Выбрать сформированный отчет</AppButon>
                        </div>
                        <ElectroCounterDeviceDetail  key={device[0].id} id={device[0].id}  />
                    </div>
                </DetailView>
            );
        }
    }
    return (
        <MainLayout
            className={classNames(cls.ElectroDevicePage,{},[className])}
            navbar={<Navbar/>}
            deviceList={<DeviceList/>}
            DetailView={content}
        />
    );
});


export default ElectroDevicePage;