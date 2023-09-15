import classNames from "shared/lib/classNames/classNames";
import { ReactNode, memo, useEffect, useState } from "react";
import cls from "./ElectroCounterDeviceDetail.module.scss";

import type { PropsWithChildren } from "react";
import { ElectroCounterDetailView } from "../ElectroCounterDetailView/ElectroCounterDetailView";
import $api from "shared/api";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { Loader } from "shared/ui/Loader/Loader";
import { getElectroDeviceData } from "entities/ElectroDevice/api/electroDeviceApi";
import { downloadXLSFile } from "entities/ElectroDevice/helpers/reportDownload";
import { ElectroStatistic } from "../ElectroStatisticBlock/ElectroStatistic";
import { ElectroPoll } from "../ElectroPoll/ElectroPoll";

interface ElectroCounterDeviceDetailProps {
 className?: string;
 id?:number;
 featuresBlock?:ReactNode;
}

export const ElectroCounterDeviceDetail = memo((props: PropsWithChildren<ElectroCounterDeviceDetailProps>) => {
    const { className,id,children,featuresBlock } = props;
    const {isLoading,data:rtkData,refetch} = getElectroDeviceData(String(id));
    const [currentCans,setCurrentCan] = useState<string[]>([]);
    const [pollInterval,setPollInterval] = useState(rtkData?.interval);
    const [autoPollMode,setAutoPollmode] = useState(rtkData?.autopoll);
    const canChangeHandler = (can:string)=>{
        setCurrentCan((prev)=>{
            if(prev.includes(can)) {
                return prev.filter(el=>can!==el);
            }
            return [...prev,can];
        });
    };

    useEffect(()=>{
        if (!isLoading){
            setPollInterval(rtkData.interval);
            setAutoPollmode(rtkData.autopoll);
    
        }
    },[isLoading]);

    if (isLoading) {
        return <Loader/>;
    }
    const statisticBlock = (
        <div>
            {Object.values(rtkData.statistic)?.map((el,i)=>
                <p key={i}>
                    {`${el.verbose} всего: ${el.count} опрошены: ${el.success} не опрошены: ${el.failed}`}
                </p>
            )}
        </div>
    );



    const editAutoPoll = async ()=>{
        const response = await $api.post("electro/"+rtkData.id+"/edit",{autopoll_flag:autoPollMode,interval_minutes:Number(pollInterval)});
        console.log("запрос из эдит авто полл");
        refetch();
    };
    return (
        <div className={classNames(cls.ElectroCounterDeviceDetail,{},[className])}>
            {children}
            <div className={cls.features}>
                <b className={cls.devTitle}>{`${rtkData.name} ${rtkData.device_type_verbose_name} №${rtkData.device_num}`}</b>
                <ElectroStatistic
                    autoPollMode={autoPollMode}
                    last_poll_seconds={rtkData.last_poll_seconds}
                    last_update={rtkData.last_update}
                    onEdit={editAutoPoll}
                    pollInterval={pollInterval}
                    setAutoPollmode={setAutoPollmode}
                    setPollInterval={setPollInterval}
                    id={id}
                />
                <ElectroPoll
                    autopoll={rtkData.autopoll}
                    id={rtkData.id}
                    isBusy={rtkData.is_busy}
                    onUpdate={refetch}
                />
                {featuresBlock}
            </div>
            <AppButon theme={AppButtonTheme.SHADOW} className={cls.btn}  onClick={()=>downloadXLSFile(rtkData.id)}>Отчет</AppButon>
            <div className={cls.interface_panel}>
                <p>{"Доступные интерфейсы:"}</p>
                {
                    Object.keys(rtkData.counters_by_can)?.map((can)=>(
                        <div key={can} className={cls.interface_list_item}>
                            <b className={cls.interface_btn} onClick={()=>canChangeHandler(can)}>{can}</b>
                            {currentCans.includes(can) && 
                                <div className={cls.container}>
                                    {
                                        rtkData.counters_by_can[can].map((counter)=>
                                            <ElectroCounterDetailView key={counter.id} counter={counter} device={rtkData}/> 
                                        )
                                    }
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            {statisticBlock}
        </div>
    );
});
