import { ReactElement } from "react";
import { AppButon } from "shared/ui/AppButton/AppButton";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ArchTypeBlock.module.scss";
import { ArchivesInfo, ArchivesRecord, SystemArchivesInfo } from "pages/HeatSubcategoryPage/api/api";
const ARCH_TYPES:Record<string,string> = {
    hour:"часовой:",day:"суточный:",month:"месячный:"
};

interface ArchTypeBlockProps {
    archData:ArchivesRecord;
    currentSystem:number;
    currentArchtype:number;
    onChangeArchtype:(archtype:number)=>void;
}



function ArchTypeBlock(props:ArchTypeBlockProps):ReactElement {
    const {archData,currentSystem,currentArchtype,onChangeArchtype} = props;
    return (
        <VFlexBox width="45%" gap="10px" className={cls.ArchTypeBLock}>
            <p>тип отчета:</p>
            <VFlexBox className={cls.archTypeBox} align="space-around">
                <HFlexBox className={cls.row} height="15%" gap={"4px"} alignItems="center" align="space-between">
                    <p className={cls.title}>часовые</p>
                    <AppInput  checked={currentArchtype===0} onClick={()=>onChangeArchtype(0)} type="radio"/>
                    <AppInput  value={archData[currentSystem] && archData[currentSystem]?.hour?.start_date} disabled className={cls.input}/>
                    <AppInput  value={archData[currentSystem] && archData[currentSystem]?.hour?.end_date} disabled className={cls.input}/>
                    <AppInput value={archData[currentSystem] && archData[currentSystem]?.hour?.count} disabled className={cls.input}/>
                </HFlexBox>
                <HFlexBox className={cls.row} height="15%" gap={"4px"} alignItems="center" align="space-between">
                    <p className={cls.title}>суточные</p>
                    <AppInput checked={currentArchtype===1} onClick={()=>onChangeArchtype(1)} type="radio"/>
                    <AppInput  value={archData[currentSystem] && archData[currentSystem]?.day?.start_date} disabled className={cls.input}/>
                    <AppInput  value={archData[currentSystem] && archData[currentSystem]?.day?.end_date} disabled className={cls.input}/>
                    <AppInput value={archData[currentSystem] && archData[currentSystem]?.day?.count} disabled className={cls.input}/>
                </HFlexBox>
                <HFlexBox className={cls.row} height="15%" gap={"4px"} alignItems="center" align="space-between">
                    <p className={cls.title}>месячные</p>
                    <AppInput checked={currentArchtype===2} onClick={()=>onChangeArchtype(2)} type="radio"/>
                    <AppInput  value={archData[currentSystem] && archData[currentSystem]?.month?.start_date} disabled className={cls.input}/>
                    <AppInput  value={archData[currentSystem] && archData[currentSystem]?.month?.end_date} disabled className={cls.input}/>
                    <AppInput value={archData[currentSystem] && archData[currentSystem]?.month?.count} disabled className={cls.input}/>
                </HFlexBox>
            </VFlexBox>
        </VFlexBox>
    );
}

export {ArchTypeBlock};