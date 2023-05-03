import classNames from "shared/lib/classNames/classNames";
import { memo, useState } from "react";
import cls from "./ElectroCounterDeviceDetail.module.scss";

import type { PropsWithChildren } from "react";
import { CANMapper, TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { timeConvert } from "shared/lib/helpers/datetimeConvert";

interface ElectroCounterDeviceDetailProps {
 className?: string;
 device?:TopLevelElectroDevice;
}

export const ElectroCounterDeviceDetail = memo((props: PropsWithChildren<ElectroCounterDeviceDetailProps>) => {
    const { className,device,children } = props;
    const {data} = useSelector((state:StateSchema)=>state.electroDevices);
    const [currentCan,setCurrentCan] = useState<CANMapper>(undefined);
    const canChangeHandler = (can:CANMapper)=>{
        setCurrentCan((prev)=>{
            if(prev===can) {
                return undefined;
            }
            return can;
        });
    };
    const content = (<div className={cls.container}>
        {
            currentCan!==undefined && 
         data.devicesByCan[device.id][currentCan].map((counter)=>
             counter.device === device.id && 
             <div className={cls.counter_line} key={counter.id}>
                 <b className={cls.rowElement}>{`${counter.device_type_verbose_name}`}</b>
                 <p className={cls.rowElement}>{`№${counter.device_num}`}</p>
                 <p className={cls.rowElement}>{`ID:${counter.inner_id}`}</p>
                 {counter.parameters.map((parameter)=>
                     <div className={cls.parameter_line} key={parameter.name}>
                         <b>{`${parameter.name}:    `}</b>
                         <p className={cls.rowElement}>{parameter.value}</p>
                         <p className={cls.rowElement}>{parameter.dimension}</p>
                     </div>
                 )
                 }   
             </div>
         )
         
        }
    </div>);
    return (
        <div className={classNames(cls.ElectroCounterDeviceDetail,{},[className])}>
            {children}
            <b>{`${device.name} ${device.device_type_verbose_name} №${device.device_num}`}</b>
            {`Дата последнего опроса ${timeConvert(device.last_update)}`}
            <div className={cls.interface_panel}>
                <p>{"Доступные интерфейсы:"}</p>
                {
                    data.devicesByCan[device.id]!==undefined && 
                    Object.keys(data.devicesByCan[device.id]).map((can)=>(
                        <div key={can} className={cls.interface_list_item}>
                            <b className={cls.interface_btn} onClick={()=>canChangeHandler(can as CANMapper)}>{can}</b>
                            {currentCan===can && content}
                        </div>
                    ))
                }
                {/* {
                    data.devicesByCan[device.id][CANMapper.CAN1] &&
                    (<div className={cls.interface_list_item}>
                        <b className={cls.interface_btn} onClick={()=>canChangeHandler(CANMapper.CAN1)}>{CANMapper.CAN1}</b>
                        {currentCan===CANMapper.CAN1 && content}
                    </div>)
                }
                {
                    data.devicesByCan[device.id][CANMapper.CAN2] &&
                    <div className={cls.interface_list_item}>
                        <b className={cls.interface_btn} onClick={()=>canChangeHandler(CANMapper.CAN2)}>{CANMapper.CAN2}</b>
                        {currentCan===CANMapper.CAN2 && content}

                    </div>
                }
                {
                    data.devicesByCan[device.id][CANMapper.CAN3] &&
                    <div className={cls.interface_list_item}>
                        <b className={cls.interface_btn} onClick={()=>canChangeHandler(CANMapper.CAN3)}>{CANMapper.CAN3}</b>
                        {currentCan===CANMapper.CAN3 && content}

                    </div>
                }
                {
                    data.devicesByCan[device.id][CANMapper.CAN4] &&
                    <div className={cls.interface_list_item}>
                        <b className={cls.interface_btn} onClick={()=>canChangeHandler(CANMapper.CAN4)}>{CANMapper.CAN4}</b>
                        {currentCan===CANMapper.CAN4 && content}
                    </div>
                } */}
            </div>
            
        </div>
    );
});
