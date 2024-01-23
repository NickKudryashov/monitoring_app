import { ReactElement } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./SystemsInfoBlock.module.scss";
import { PARAMBOX_MAPPER } from "../ParameterView/ParameterView";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { HeatParameters, HeatSystem } from "entities/Heatcounters";
import classNames from "shared/lib/classNames/classNames";


interface SystemsInfoBLockProps {
    systems:HeatSystem[];
}



export function SystemsInfoBLock (props:SystemsInfoBLockProps):ReactElement{
    const {systems} = props;
    return(
        <VFlexBox className={cls.content}   alignItems="center">
            {/* <div className={cls.paramBoxHeader}> */}
            <VFlexBox width={"45%"} height={"90%"} className={cls.paramFlexBox}>
                <p className={classNames(cls.sysHeader,{},[cls.paramBoxHeader])}>{"ТЕПЛОВЫЕ СХЕМЫ И ФОРМУЛЫ"}</p>
                {/* </div> */}
                <VFlexBox className={cls.rows} alignItems="center" height="80%">
                    {systems?.map((elem) => 
                        <VFlexBox height={"10%"} width={"80%"}  key={elem.id} alignItems="end" align="space-around">
                            <HFlexBox align="space-around">
                                <p>{`ТЕПЛОВАЯ СХЕМА ${elem.index+1}`}</p>
                                <p>{elem.name ?? ""}</p>
                            </HFlexBox>
                            <HFlexBox align="space-around" className={cls.paramRow}>
                                <VFlexBox alignItems="start" width="50%">
                                    <p>ФОРМУЛА</p>
                                    <p>{elem.formula ?? "не определена"}</p>
                                </VFlexBox>
                                <VFlexBox alignItems="end" width="50%">
                                    <p>СХЕМА</p>
                                    <p>{elem.schema ?? "не определена"}</p>
                                </VFlexBox>
                            </HFlexBox>
                        </VFlexBox>
                    )}
                </VFlexBox>
            </VFlexBox>
        </VFlexBox>
    );
}