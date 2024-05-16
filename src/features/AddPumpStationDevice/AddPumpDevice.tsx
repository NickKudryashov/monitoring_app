
import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect, useState } from "react";
import cls from "./AddPumpDevice.module.scss";

import type { PropsWithChildren } from "react";
import $api from "shared/api";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { Modal } from "shared/ui/Modal/Modal";
import { useAppDispatch } from "shared/hooks/hooks";
import { fetchPumpDevice } from "entities/PumpDevice";
import { getObjectSubcategoryData } from "entities/ObjectSubCategory";

interface AddPumpDeviceProps {
 className?: string;
 isOpen?:boolean;
 onClose?:()=>void;
 lazy?:boolean
}

interface ConnectionInfoProps {
    ip:string;
    port:string;
    connection_type:string;
}

interface AddRequestProps {
    user_object:number;
    name:string;
    device_type:string;
    device_type_verbose_name:string;
    device_num:number;
    connection_info:ConnectionInfoProps;
    slave_adress:number;
    template_num:number;
    subcategory:number;
}

const AVAILABLE_TYPE = "sk_712";
const AVAILABLE_TYPE2 = "grundfoss";
const AVAILABLE_TYPE_VERBOSE = "SK 712";
const AVAILABLE_TYPE_VERBOSE2 = "Grundfoss";

const DeviceConnection = {
    TCP:"TCP",
    UDP:"UDP"
};


export const AddPumpDevice = memo((props: PropsWithChildren<AddPumpDeviceProps>) => {
    const { className,isOpen,onClose,lazy=true } = props;
    const [devType,setDevType] = useState(AVAILABLE_TYPE);
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const [selectedSubcat,setSelectedSubcat] = useState("-1");
    const [dnum,setDnum] = useState("");
    const [name,setName] = useState("");
    const [selectedObj,setSelectedObj] = useState("-1");
    const { data, isLoading,refetch } = getObjectSubcategoryData(Number(selectedObj));
    const [connectionProtocol,setConenctionProtocol] = useState(DeviceConnection.TCP);
    const [ip,setIp] = useState(""); 
    const [port,setPort] = useState("");
    const [slave,setSlave] = useState("");
    const [templ,setTempl] = useState("2");
    const dispatch = useAppDispatch();
    if (!isOpen && lazy) {
        return null;
    }
    objects.length===0 && console.log("пусто");
    const addRequest = async (data:AddRequestProps) => {
        const response = await $api.post("pump",data);
        if (response.status!==200) {
            alert("Ошибка при добавлении прибора");
        }
    };

    const accept = async ()=>{
        const connection_info = {
            ip,
            port,
            connection_type:connectionProtocol
        };
        const requestData:AddRequestProps = {
            user_object:Number(selectedObj),
            name,
            device_type:devType,
            device_type_verbose_name:AVAILABLE_TYPE_VERBOSE,
            device_num:Number(dnum),
            connection_info,
            subcategory:Number(selectedSubcat),
            slave_adress:Number(slave),
            template_num:Number(templ)
        };
        const result = await addRequest(requestData);
        dispatch(fetchPumpDevice());
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className={classNames(cls.AddPumpDevice,{},[className])}>
            <div className={cls.AddPumpDevice}>
                <AppInput value={name} onChange={(e)=>setName(e.target.value)} placeholder="Имя прибора"/>
                <AppInput value={dnum} onChange={(e)=>setDnum(e.target.value)} placeholder="Номер прибора"/>
                <select value={devType} onChange={e=>setDevType(e.target.value)}>
                    <option disabled={true} value="-1">Тип прибора</option>
                    <option key={AVAILABLE_TYPE}  value={AVAILABLE_TYPE}>{AVAILABLE_TYPE_VERBOSE}</option>
                    <option key={AVAILABLE_TYPE2}  value={AVAILABLE_TYPE2}>{AVAILABLE_TYPE_VERBOSE2}</option>
                </select>
                <select value={selectedObj} onChange={e=>setSelectedObj(e.target.value)}>
                    <option disabled={true} value="-1">Выберите объект</option>
                    {objects.map(obj=><option key={obj.id}  value={obj.id}>{obj.name}</option>)}
                </select>
                <select value={selectedSubcat} onChange={e=>setSelectedSubcat(e.target.value)}>
                    <option disabled={true} value="-1">Выберите подкатегорию</option>
                    {data?.data.map(obj=>obj.user_object===Number(selectedObj)&&<option key={obj.id}  value={obj.id}>{obj.name}</option>)}
                </select>
                <select value={connectionProtocol} onChange={e=>setConenctionProtocol(e.target.value)}>
                    <option value={DeviceConnection.TCP}>{DeviceConnection.TCP}</option>
                    <option value={DeviceConnection.UDP}>{DeviceConnection.UDP}</option>
                </select>
                <select value={templ} onChange={e=>setTempl(e.target.value)}>
                    <option disabled={true} value="-1">Выберите шаблон параметров</option>
                    <option value='2'>Шаблон на 2 насоса</option>
                    <option value='3'>Шаблон на 3 насоса</option>
                </select>
                <AppInput value={ip} onChange={e=>setIp(e.target.value)} placeholder="IP адрес" />
                <AppInput value={port} onChange={e=>setPort(e.target.value)} placeholder="Порт" />
                <AppInput value={slave} onChange={e=>setSlave(e.target.value)} placeholder="Slave адрес" />
                <button onClick={()=>accept()}>Добавить</button>
                <button onClick={()=>onClose()} >Отмена</button>
            </div>
        </Modal>
    );
});
