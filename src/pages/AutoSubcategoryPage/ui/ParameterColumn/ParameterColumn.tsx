import { ReactElement } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumn.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { AutomaticDeviceData, ParameterGroup, PumpParameter } from "entities/AutomaticDevice/model/types/AutomaticDeviceTypes";
import classNames from "shared/lib/classNames/classNames";
import { ParamRecord } from "../AutoSubcategoryPage/AutoSubcategoryPage";
interface ParameterColumnProps {
    params:ParamRecord[];
    header:string;
    fullWidth?:boolean;
    fullHeight?:boolean;
    detail?:boolean;
    className?:string;
}



export function ParameterColumn (props:ParameterColumnProps):ReactElement{
    const {params,className,header,fullWidth=false,fullHeight=false,detail=false} = props;
    console.log(params);
    return(
        <VFlexBox width={fullWidth ? "100%" :"45%"} height={fullHeight ? "100%" :"45%"} alignItems="center"className={cls.paramFlexBox}>
            {/* <div className={cls.paramBoxHeader}> */}
            <p className={classNames(cls.sysHeader,{},[cls.paramBoxHeader])}>{header}</p>
            {/* </div> */}
            <VFlexBox className={cls.rows} height="95%">
                {params?.map((elem,i) =>
                    <VFlexBox width="90%" height={`${5+6*elem.parameters.length}%`} gap="5px" key={i}>
                        <p className={cls.groupLabel} >{elem.name}</p>
                        {
                            elem.parameters.map((oaram)=>
                                <HFlexBox height={`${100/(elem.parameters.length+1)*0.8}%`} className={cls.paramRow} key={oaram.id} alignItems="end" align="space-between">
                                    <div className={cls.paramVerboseWrapper}>
                                        <p>{oaram.verbose}</p>
                                    </div>
                                    {detail && <div className={classNames(cls.paramVerboseWrapper,{},[cls.tagWrap,])}>
                                        <p>{oaram.tag}</p>
                                    </div>}
                                    <HFlexBox alignItems="center" align="space-around" className={cls.paramValueWrapper}  width={"15%"}>
                                        <p className={cls.valueField}>{oaram.value}</p>
                                    </HFlexBox>
                        
                                </HFlexBox>
                            )
                        }
                        
                    </VFlexBox> 
                    
                )}
            </VFlexBox>
        </VFlexBox>

    );
}