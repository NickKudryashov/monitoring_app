import classNames from "shared/lib/classNames/classNames";
import { ReactNode, memo, useEffect, useRef, useState } from "react";
import cls from "./ElectroCounterDeviceDetail.module.scss";

import type { PropsWithChildren } from "react";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { timeConvert } from "shared/lib/helpers/datetimeConvert";
import { ElectroCounterDetailView } from "../ElectroCounterDetailView/ElectroCounterDetailView";
import $api, { API_URL } from "shared/api";
import axios, { AxiosRequestConfig } from "axios";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { useAppDispatch } from "shared/hooks/hooks";
import { fetchElectroDevices } from "entities/ElectroDevice/model/services/fetchElectroDevice/fetchElectroDevice";
import { Loader } from "shared/ui/Loader/Loader";

interface ElectroCounterDeviceDetailProps {
 className?: string;
 id?:number;
 featuresBlock?:ReactNode;
}

export const ElectroCounterDeviceDetail = memo((props: PropsWithChildren<ElectroCounterDeviceDetailProps>) => {
    const { className,id,children,featuresBlock } = props;
    const {data,selectedDevice} = useSelector((state:StateSchema)=>state.electroDevices);
    const device = data?.topLevelDevices?.filter((d)=>d.id===id)[0];
    // const [currentCan,setCurrentCan] = useState<CANMapper>(undefined);
    const [currentCans,setCurrentCan] = useState<string[]>([]);
    // console.log(device.statistic);
    const canChangeHandler = (can:string)=>{
        setCurrentCan((prev)=>{
            if(prev.includes(can)) {
                return prev.filter(el=>can!==el);
            }
            return [...prev,can];
        });
    };
    if (!device) {
        return <Loader/>;
    }
    const statisticBlock = (
        <div>
            {Object.values(device?.statistic)?.map((el,i)=>
                <p key={i}>
                    {`${el.verbose} всего: ${el.count} опрошены: ${el.success} не опрошены: ${el.failed}`}
                </p>
            )}
        </div>
    );
    // useEffect(()=>{
    //     setCurrentCan([]);
    //     return ()=>{
    //         setCurrentCan([]);
    //     };
    // },[selectedDevice]);
    // const content = (
    //     <div className={cls.container}>
    //         {
    //             currentCans.length && 
    //         currentCans.map(
    //             (currentCan)=>data.devicesByCan[device.id][currentCan] && data.devicesByCan[device.id][currentCan]?.map(
    //                 (counter)=>
    //                     <ElectroCounterDetailView key={counter.id} counter={counter} device={device}/> 
    //             )
    //         )
    //         }
    //     </div>
    // );
    const downloadXLSFile = async (id:number) => {
        const response = $api.post(`electro_report/${id}`);
        fetch(`${API_URL}electro_report/${id}`,{method:"PUT",headers:{"Authorization":"Bearer "+localStorage.getItem("access_token")}}).then(
            response => {
                response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    console.log(url);
                    a.href = url;
                    a.download = `${device.name}_${device.device_type_verbose_name}_отчет.xlsx`;
                    a.click();
                    a.remove();
                });
            });
    };

    
    return (
        <div className={classNames(cls.ElectroCounterDeviceDetail,{},[className])}>
            {children}
            <div className={cls.features}>
                <div className={cls.titleBlock}>
                    <b className={cls.devTitle}>{`${device.name} ${device.device_type_verbose_name} №${device.device_num}`}</b>
                    {`Дата последнего опроса ${timeConvert(selectedDevice?.last_update ?? device.last_update)}`}
                    {device.last_poll_seconds!==undefined && <br/>}
                    {device.last_poll_seconds!==undefined && `Длительность предыдущего опроса: ${device?.last_poll_seconds / 60} минут`}
                </div>
                {featuresBlock}
            </div>
            {/* <AppButon theme={AppButtonTheme.SHADOW} className={cls.btn}  onClick={()=>downloadXLSFile(device.id)}>Отчет</AppButon> */}
            <div className={cls.interface_panel}>
                <p>{"Доступные интерфейсы:"}</p>
                {
                    data.devicesByCan[device.id]!==undefined && 
                    Object.keys(data.devicesByCan[device.id])?.map((can)=>(
                        <div key={can} className={cls.interface_list_item}>
                            <b className={cls.interface_btn} onClick={()=>canChangeHandler(can)}>{can}</b>
                            {currentCans.includes(can) && 
                            <div className={cls.container}>
                                {
                                    currentCans.length && 
                            currentCans.map(
                                (currentCan)=>data.devicesByCan[device.id]!==undefined && data.devicesByCan[device.id][currentCan]?.map(
                                    (counter)=> can===counter.interface &&
                                        <ElectroCounterDetailView key={counter.id} counter={counter} device={device}/> 
                                )
                            )
                                }
                            </div>}
                        </div>
                    ))
                }
            </div>
            {statisticBlock}
        </div>
    );
});
