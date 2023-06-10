import classNames from "shared/lib/classNames/classNames";
import { memo, useState } from "react";
import cls from "./AddElectroDevice.module.scss";

import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { Modal } from "shared/ui/Modal/Modal";
import $api from "shared/api";
import { useAppDispatch } from "shared/hooks/hooks";
import { fetchElectroDevices } from "entities/ElectroDevice";

interface AddElectroDeviceProps {
 className?: string;
 isOpen?:boolean;
 lazy?:boolean;
 onClose?:()=>void;
}
const UM_31_TYPE = "um_31";
const UM_31_VERBOSE = "УМ-31";
const DeviceConnection = {
    TCP:"TCP",
    UDP:"UDP"
};
export const AddElectroDeviceContent = memo((props: PropsWithChildren<AddElectroDeviceProps>) => {
    const { className,isOpen,onClose,lazy } = props;
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const {data} = useSelector((state:StateSchema)=>state.electroNodes);
    console.log(objects);
    const [selectedObj,setSelectedObj] = useState(String(objects ? objects[0].id : ""));
    const [connectionProtocol,setConenctionProtocol] = useState(DeviceConnection.TCP);
    const [name,setName] = useState("");
    const [dnum,setDnum] = useState("");
    const [ip,setIp] = useState("");
    const [port,setPort] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useAppDispatch();
    const [devType,setDevType] = useState(UM_31_VERBOSE);
    const accept = async ()=> {
        const requestData = {
            user_object:Number(selectedObj),
            name,
            device_type:UM_31_TYPE,
            device_type_verbose_name:UM_31_VERBOSE,
            node:data.filter((el)=>{
                if (el.user_object===Number(selectedObj)) {
                    return el.id;
                }
            })[0].id,
            device_num:Number(dnum),
            connection_info:{
                ip:ip,
                port,
                connection_type:connectionProtocol
            },
            password
        };
        const response = await $api.post("electro_top_level_device/add",{...requestData});
        dispatch(fetchElectroDevices());
        onClose();
    };
    return (
        <Modal  isOpen={isOpen} onClose={onClose} className={classNames(cls.AddElectroDevice,{},[className])}>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Название прибора" />
            <input value={dnum} onChange={(e)=>setDnum(e.target.value)} placeholder="Номер прибора" />
            <select value={devType} onChange={e=>setDevType(e.target.value)}>
                <option disabled={true} value="-1">Тип прибора</option>
                <option key={UM_31_TYPE}  value={UM_31_TYPE}>{UM_31_VERBOSE}</option>
            </select>
            <select value={selectedObj} onChange={e=>setSelectedObj(e.target.value)}>
                <option disabled={true} value="-1">Выберите объект</option>
                {objects.map(obj=><option key={obj.id}  value={obj.id}>{obj.name}</option>)}
            </select>
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Пароль прибора" />
            <select value={connectionProtocol} onChange={e=>setConenctionProtocol(e.target.value)}>
                <option value={DeviceConnection.TCP}>{DeviceConnection.TCP}</option>
                <option value={DeviceConnection.UDP}>{DeviceConnection.UDP}</option>
            </select>
            <input value={ip} onChange={e=>setIp(e.target.value)} placeholder="IP адрес" />
            <input value={port} onChange={e=>setPort(e.target.value)} placeholder="Порт" />
            <button onClick={()=>accept()}>Добавить</button>
            <button onClick={()=>onClose()} >Отмена</button>
        </Modal>
    );
});


export const AddElectroDevice = memo((props: PropsWithChildren<AddElectroDeviceProps>) => {
    const {lazy,isOpen} = props;
    if (lazy && !isOpen) {
        return null;
    }
    else {
        return (
            <AddElectroDeviceContent {...props}/>
        );
    }
});