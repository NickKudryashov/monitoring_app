// import classNames from 'shared/lib/classNames/classNames';
// import cls from './AddHeatDevice.module.scss';

import { getDevices, HeatSystem } from "entities/Heatcounters";
import { objectsAllRequest } from "entities/Objects";
import { PropsWithChildren, useState } from "react";
import $api from "shared/api";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import { AppButon } from "shared/ui/AppButton/AppButton";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { Modal } from "shared/ui/Modal/Modal";
import cls from "./AddHeatDevice.module.scss";
interface AddHeatDeviceProps {
 className?: string;
 onClose?:()=>void;
 isOpen?:boolean;
}

interface DevCon {
    TCP:string;
    UDP:string;
}

const DeviceConnection:DevCon =  {
    TCP:"TCP",
    UDP:"UDP"
} as const;

const TEROSS_TYPE="teross";
const ST10_229="st10_229";
const ST10_234="st10_234";
const ST10_236="st10_236";
const ST20_238="st20_238";
const ST20_239="st20_239";
export function AddHeatDevice(props: PropsWithChildren<AddHeatDeviceProps>) {
    const { className,isOpen,onClose } = props;
    const {objects} = useAppSelector(state=>state.objectReducer);
    const {heatNodes} = useAppSelector(state=>state.heatNodeReducer);
    const [selectedObj,setSelectedObj] = useState("-1");
    const [name,setName] = useState("");
    const dispatch = useAppDispatch();
    const [deviceNum,setDeviceNum]=useState("");
    const [deviceType,setDeviceType] = useState(TEROSS_TYPE);
    const [ip,setIp] = useState("");
    const [port,setPort]=useState("");
    const [connectionProtocol,setConenctionProtocol] = useState(DeviceConnection.TCP);
    const [systems,setSystems] = useState([]);

    const [systemCount,setSystemCount] = useState("-1");

    const addHandler = async ()=> {
        const connection_info = {port,ip,connection_type:connectionProtocol};
        const user_object = Number(selectedObj);
        const node = heatNodes.filter(hnode=>hnode.user_object===user_object)[0].id;
        const body = {
            name,
            user_object:Number(selectedObj),
            connection_info,
            device_num:Number(deviceNum),
            device_type:deviceType,
            systems,
            node
        };
        await $api.post("device/add",body);
        dispatch(getDevices());
        onClose();
    };

    const systemsChanged = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const nums = Number(e.target.value);
        const result = [];
        for (let i = 0;i<nums;i++){
            const temp = {name:`ТС${i+1}`,index:i,is_active:true};
            result.push(temp);
        }
        setSystems(result);
        setSystemCount(e.target.value);
    };

    const changeSysName = (index:number,name:string)=>{
        systems.map(sys=>{
            if (sys.index===index) {
                return {...sys,name};
            }
            return {...sys};
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={cls.AddHeatDevice}>
                Добавить новый прибор:
                <AppInput theme={InputThemes.OUTLINE} value={name} onChange={e=>setName(e.target.value)} placeholder="Название прибора"/>
                <AppInput theme={InputThemes.OUTLINE} value={deviceNum} onChange={e=>setDeviceNum(e.target.value)} placeholder="Номер прибора"/>
                <AppInput theme={InputThemes.OUTLINE} value={ip} onChange={e=>setIp(e.target.value)} placeholder="IP адрес"/>
                <AppInput theme={InputThemes.OUTLINE} value={port} onChange={e=>setPort(e.target.value)} placeholder="Порт"/>
                <select value={connectionProtocol} onChange={e=>setConenctionProtocol(e.target.value)}>
                    <option value={DeviceConnection.TCP}>{DeviceConnection.TCP}</option>
                    <option value={DeviceConnection.UDP}>{DeviceConnection.UDP}</option>
                </select>
                <select value={deviceType} onChange={e=>setDeviceType(e.target.value)}>
                    <option value={ST10_229}>{"ВТЭ-1П140(141) тип 229"}</option>
                    <option value={ST10_234}>{"ВТЭ-1П140(141) тип 234"}</option>
                    <option value={ST10_236}>{"ВТЭ-1П140(141) тип 236"}</option>
                    <option value={ST20_238}>{"ВТЭ-2П14хМ тип 238"}</option>
                    <option value={ST20_239}>{"ВТЭ-2П15хМ тип 239"}</option>
                    <option value={TEROSS_TYPE}>{"Теросс-ТМ"}</option>
                </select>
                <select value={selectedObj} onChange={e=>setSelectedObj(e.target.value)}>
                    <option disabled={true} value="-1">Выберите объект</option>
                    {objects.map(obj=><option key={obj.id}  value={obj.id}>{obj.name}</option>)}
                </select>
                <select value={systemCount} onChange={systemsChanged}>
                    <option disabled={true} value="-1">Выберите количество тепловых систем</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                {systems.map(sys=>
                    <div key={sys.index}>
                        {`Тепловая система №${sys.index+1}`}
                        <AppInput  theme={InputThemes.OUTLINE} value={sys.name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>changeSysName(sys.index,e.target.value)}/>
                    </div>
                )}
                <AppButon onClick={addHandler}>OK</AppButon>
            </div>
        </Modal>
    );
}