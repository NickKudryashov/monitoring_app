import { ReactElement } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumn.module.scss";
import { PARAMBOX_MAPPER } from "../ParameterView/ParameterView";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { HeatParameters } from "entities/Heatcounters";
import classNames from "shared/lib/classNames/classNames";
interface ParameterColumnProps {
    params:HeatParameters[];
    header:string;
}



export function ParameterColumn (props:ParameterColumnProps):ReactElement{
    const {header,params} = props;
    return(
        <VFlexBox width={"45%"} height={"45%"} alignItems="center"className={cls.paramFlexBox}>
            {/* <div className={cls.paramBoxHeader}> */}
            <p className={classNames(cls.sysHeader,{},[cls.paramBoxHeader])}>{`ПАРАМЕТРЫ КОНТУРА ${header}`}</p>
            {/* </div> */}
            <VFlexBox className={cls.rows} height="80%">
                {params?.map((elem) => 
                    <HFlexBox height={"10%"} className={cls.paramRow} key={elem.id} alignItems="end" align="space-around">
                        <div className={cls.paramVerboseWrapper}>
                            <p>{elem.verbose_name}</p>
                        </div>
                        <p className={cls.paramNameField}>{elem.name}</p>
                        <HFlexBox alignItems="center" align="space-around" className={cls.paramValueWrapper}  width={"20%"}>
                            <p className={cls.valueField}>{elem.value}</p>
                            <p className={cls.dimensionField}>{elem.dimension}</p>

                        </HFlexBox>
                        
                    </HFlexBox>
                )}
            </VFlexBox>
        </VFlexBox>
    );
}