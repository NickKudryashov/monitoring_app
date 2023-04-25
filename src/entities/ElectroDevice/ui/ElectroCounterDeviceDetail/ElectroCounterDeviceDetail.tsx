import classNames from "shared/lib/classNames/classNames";
import { memo, useState } from "react";
import cls from "./ElectroCounterDeviceDetail.module.scss";

import type { PropsWithChildren } from "react";
import { CANMapper, TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

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
    return (
        <div className={classNames(cls.ElectroCounterDeviceDetail,{},[className])}>
            {children}
            <b>{`Прибор ${device.device_type_verbose_name} №${device.device_num}`}</b>
            <div className={cls.interface_panel}>
                <p>{"Доступные интерфейсы:"}</p>
                {
                    data && data.devicesByCan[CANMapper.CAN1].length!==0 && 
                    <div>
                        <b onClick={()=>canChangeHandler(CANMapper.CAN1)}>{CANMapper.CAN1}</b>
                    </div>
                }
                {
                    data && data.devicesByCan[CANMapper.CAN2].length!==0 && 
                    <div>
                        <b onClick={()=>canChangeHandler(CANMapper.CAN2)}>{CANMapper.CAN2}</b>
                    </div>
                }
                {
                    data && data.devicesByCan[CANMapper.CAN3].length!==0 && 
                    <div>
                        <b onClick={()=>canChangeHandler(CANMapper.CAN3)}>{CANMapper.CAN3}</b>
                    </div>
                }
                {
                    data && data.devicesByCan[CANMapper.CAN4].length!==0 && 
                    <div>
                        <b onClick={()=>canChangeHandler(CANMapper.CAN4)}>{CANMapper.CAN4}</b>
                    </div>
                }
            </div>
            <div className={cls.container}>
                {
                    currentCan!==undefined && 
                 data.devicesByCan[currentCan].map((counter)=>
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
            </div>
        </div>
    );
});
