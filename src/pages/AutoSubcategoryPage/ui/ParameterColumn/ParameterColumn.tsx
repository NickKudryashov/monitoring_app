import { ReactElement } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumn.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { AutomaticDeviceData, ParameterGroup } from "entities/AutomaticDevice/model/types/AutomaticDeviceTypes";
import classNames from "shared/lib/classNames/classNames";
interface ParameterColumnProps {
    params:ParameterGroup[];
    className?:string;
}



export function ParameterColumn (props:ParameterColumnProps):ReactElement{
    const {params,className} = props;
    return(
        <HFlexBox className={classNames(cls.paramGroups,{},[className,])} width="50%" gap="10px" align="space-around" alignItems="center">

            <VFlexBox width={"90%"} alignItems="center"className={cls.paramFlexBox}>
                <HFlexBox align="space-between" height={"20%"} className={cls.paramBoxHeader}>
                    <div className={classNames(cls.paramHeaderArea,{},[cls.nameTitle])}>ВСЕ ПАРАМЕТРЫ</div>
                    <div className={classNames(cls.paramHeaderArea,{},[cls.tagTitle])}>КОД ПАРАМЕТРА</div>
                    <div className={classNames(cls.paramHeaderArea,{},[cls.valueTitle])}>ТЕКУЩИЕ</div>
                    <div className={classNames(cls.paramHeaderArea,{},[cls.editTitle])}>РЕДАКЦИЯ</div>
                </HFlexBox>
                <VFlexBox>
                    {params?.map((elem) => 
                        <VFlexBox gap='10px' key={elem.id}>
                            <p className={cls.paramGroupHeader}>{elem.name}</p>
                            { elem.parameters.map((param)=>
                        
                                <HFlexBox gap="5px" height={"9%"} className={cls.paramRow} key={elem.id} alignItems="end" align="space-between">
                                    <p className={cls.paramNameField}>{param.verbose}</p>
                                    <p className={cls.paramTagField}>{param.tag}</p>
                                    <div className={cls.paramValueWrapper}>
                                        <p>{`${param.value} ${param.dimension}`}</p>
                                    </div>
                                    <div className={cls.paramEditWrapper}>
                                        {param.writable && <p>{`${param.value} ${param.dimension}`}</p> }
                                        
                                    </div>
                                    {/* <div className={cls.paramVerboseWrapper}>
                                    <p>{param.verbose}</p>
                                </div> */}
                                </HFlexBox>
                        
                        
                            )
                            
                            }
                        </VFlexBox>
                    )}
                </VFlexBox>
            </VFlexBox>
        </HFlexBox>

    );
}