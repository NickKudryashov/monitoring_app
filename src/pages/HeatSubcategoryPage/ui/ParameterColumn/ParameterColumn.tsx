import { ReactElement } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumn.module.scss";
import { PARAMBOX_MAPPER } from "../ParameterView/ParameterView";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { HeatParameters } from "entities/Heatcounters";
interface ParameterColumnProps {
    params:HeatParameters[];
    header:string;
}



export function ParameterColumn (props:ParameterColumnProps):ReactElement{
    const {header,params} = props;
    return(
        <VFlexBox alignItems="center"className={cls.paramFlexBox}>
            <div className={cls.paramBoxHeader}>
                <p>{header}</p>
            </div>
            <VFlexBox>
                {params?.map((elem) => 
                    <HFlexBox height={"9%"} className={cls.paramRow} key={elem.id} alignItems="end" align="space-around">
                        <p className={cls.paramNameField}>{elem.name}</p>
                        <VFlexBox className={cls.valueFlexBox}>
                            <p>{elem.dimension}</p>
                            <div className={cls.paramValueWrapper}>
                                <p>{elem.value}</p>
                            </div>
                        </VFlexBox>
                        <div className={cls.paramVerboseWrapper}>
                            <p>{elem.verbose_name}</p>
                        </div>
                    </HFlexBox>
                )}
            </VFlexBox>
        </VFlexBox>
    );
}