import classNames from "shared/lib/classNames/classNames";
import { memo, useState } from "react";
import cls from "./ElectroCounterDeviceDetail.module.scss";

import type { PropsWithChildren } from "react";
import { ElectroCounter, TopLevelDeviceStatistic } from "entities/ElectroDevice/model/types/electroDevice";
import {Dict} from "../../model/types/electroDevice";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { ElectroCounterDetailView } from "../ElectroCounterDetailView/ElectroCounterDetailView";

interface ElectroCounterDeviceDetailProps {
 className?: string;
 cansWithDev:Dict<ElectroCounter[]>;
 stat:Dict<TopLevelDeviceStatistic>;
 devname:string;
}

export const ElectroCounterDeviceDetail = memo((props: PropsWithChildren<ElectroCounterDeviceDetailProps>) => {
    const { className,cansWithDev,devname,stat } = props;
    const [currentCan,setCurrentCan] = useState<string>();
    // const [pollInterval,setPollInterval] = useState(rtkData?.interval);
    // const [autoPollMode,setAutoPollmode] = useState(rtkData?.autopoll);
    const canChangeHandler = (can:string)=>{
        setCurrentCan((prev)=>{
            if(prev===can) {
                return "";
            }
            return can;
        });
    };

    return (
        <VFlexBox gap="5px" className={classNames(cls.main,{},[className,])} >
            {
                cansWithDev &&  Object.keys(cansWithDev).map((el)=>
                    <VFlexBox height={el===currentCan ? "80%" :"10%"} key={el}>
                        <HFlexBox onClick={()=>canChangeHandler(el)} align="space-around" alignItems="center" height={el===currentCan ? "12%" :"100%"}  className={classNames(cls.canHeader,{[cls.selectedCan]:el===currentCan},[])}>
                            <HFlexBox width="45%" gap="10px" alignItems="center">
                                <p>{devname}</p>
                                <p>{el}</p>
                                <p className={cls.canVerbDev}>{stat[el].verbose}</p>
                            </HFlexBox>
                            <HFlexBox width="40%" alignItems="center" align="space-around">
                                <p>{`всего: ${stat[el].count}`}</p>
                                <p>{`опрошены: ${stat[el].success}`}</p>
                                <p>{`не опрошены: ${stat[el].failed}`}</p>
                            </HFlexBox>
                        </HFlexBox>
                        {
                            el===currentCan && 
                            <VFlexBox height="88%" gap="5px" className={cls.countersField}>
                                {
                                    cansWithDev[el].map((counter)=>
                                        <ElectroCounterDetailView className={cls.row}  key={counter.id}  counter={counter} />
                                    )
                                }
                            </VFlexBox>
                            
                        }
                    </VFlexBox>
                    
                )
            }
        </VFlexBox>
    );
});
