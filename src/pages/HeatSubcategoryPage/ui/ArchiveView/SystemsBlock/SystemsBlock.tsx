import { ReactElement, useEffect, useMemo, useState } from "react";
import { AppButon } from "shared/ui/AppButton/AppButton";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./SystemsBlock.module.scss";
import { HeatDevice } from "entities/Heatcounters";
import { ArchivesInfo, ArchivesRecord } from "pages/HeatSubcategoryPage/api/api";
import { convertToDatetimeInput } from "shared/lib/helpers/datetimeConvert";
const SCHEMA_MOCK = [
    "ТС1 М[2ип]",
    "ТС1 1",
    "ТС1 М[2о]",
    "ТС1 М[1р]"
];

interface SystemBlockProps {
    deviceData:HeatDevice;
    onChangeSystem:(id:number)=>void;
    currentSystem:number;
    archData:ArchivesRecord;
    currentArchtype:number;
    sdate:string;
    edate:string;
    setSdate:(src:string)=>void;
    setEdate:(src:string)=>void;
}
const ARCHTYPE_MAPPER:Record<number,string> = {
    0:"hour",
    1:"day",
    2:"month"
};
function SystemsBlock(props:SystemBlockProps):ReactElement {
    const {deviceData,onChangeSystem,currentSystem,archData,currentArchtype,edate,sdate,setEdate,setSdate} = props;
    const mapper:Record<number,ArchivesInfo> = useMemo(()=>({
        0:archData[currentSystem]?.hour,
        1:archData[currentSystem]?.day,
        2:archData[currentSystem]?.month,
    }),[archData,currentSystem]);
    useEffect(()=>{
        if (mapper[currentArchtype]) {
            setSdate(convertToDatetimeInput(mapper[currentArchtype]?.start_date));
            setEdate(convertToDatetimeInput(mapper[currentArchtype]?.end_date));
    
        }
    },[currentArchtype,mapper]);
    // setSdate(convertToDatetimeInput(mapper[currentArchtype].start_date));
    // setEdate(convertToDatetimeInput(mapper[currentArchtype].end_date));
    return (
        <VFlexBox width="49%" gap="10px" className={cls.SystemsBlock}>
            <p>тепловая система:</p>
            <HFlexBox align="space-around" alignItems="center" className={cls.archTypeBox}>
                <VFlexBox width="35%" height="80%"  align="space-around">
                    {deviceData?.systems?.map((el,i)=>
                        <HFlexBox className={cls.row} height="10%" gap={"4px"} alignItems="center" align="space-between"  key={i}>
                            <p className={cls.title}>{`ТС${el.index+1} `+el.schema}</p>
                            <AppInput checked={el.id===currentSystem} onClick={()=>onChangeSystem(el.id)} type="radio"/>
                        </HFlexBox>
                    )}
                </VFlexBox> 
                <VFlexBox width="58%" height="80%">
                    <p>выбор даты:</p>
                    <HFlexBox alignItems="center">
                        <p className={cls.dateTitle}>с:</p>
                        <AppInput value={sdate} onChange={(e)=>setSdate(e.target.value)} type="date" className={cls.input}/>
                    </HFlexBox>
                    <HFlexBox alignItems="center">
                        <p className={cls.dateTitle}>по:</p>
                        <AppInput value={edate} onChange={(e)=>setEdate(e.target.value)} type="date" className={cls.input}/>
                    </HFlexBox>
                </VFlexBox>
            </HFlexBox>
            
        </VFlexBox>
    );
}

export {SystemsBlock};