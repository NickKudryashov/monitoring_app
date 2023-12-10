import { ReactElement } from "react";
import classNames from "shared/lib/classNames/classNames";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ConfigParameterColumn.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { ConfigurationParameterAnswer } from "pages/HeatSubcategoryPage/api/api";
export function ConfigParameterColumn(props:{configParameters:ConfigurationParameterAnswer[]}):ReactElement {
    const {configParameters} = props;
    return (
        <VFlexBox alignItems="center" className={classNames(cls.paramFlexBox, {}, [cls.configFlexBox,])}>
            <div className={cls.paramBoxHeader}>
                <p>{"Предустановленные параметры"}</p>
            </div>
            <VFlexBox alignItems="center" className={cls.content}>
                {configParameters?.map((elem, i) => 
                    <HFlexBox height="15%" className={classNames(cls.paramRow, {}, [cls.confParamRow])} key={i} gap="15px" alignItems="start" align="space-between">
                        <VFlexBox width="20%" align="space-between">
                            <p className={cls.paramNameField}>{elem.name}</p>
                            <p className={cls.paramNameField}>{elem.name}</p>
                        </VFlexBox>
                        {/* <HFlexBox width="30%"> */}
                        <VFlexBox width="35%" align="space-between">
                            <p>номер прибора</p>
                            <HFlexBox gap="5px" alignItems="end">
                                <p>min</p>
                                <div className={classNames(cls.paramValueWrapper, {}, [cls.configParams,])}>
                                    <p>{elem.min}</p>
                                </div>
                            </HFlexBox>
                        </VFlexBox>
                        <VFlexBox width="35%" align="space-between">
                            <div className={classNames(cls.paramValueWrapper, {}, [cls.configParams,])}>
                                <p>{elem.gnum}</p>
                            </div>
                            <HFlexBox gap="5px" alignItems="end">
                                <p>max</p>
                                <div className={classNames(cls.paramValueWrapper, {}, [cls.configParams,])}>
                                    <p>{elem.max}</p>
                                </div>
                            </HFlexBox>
                            
                        </VFlexBox>


                    </HFlexBox>
                )}
            </VFlexBox>
        </VFlexBox>
    );
}