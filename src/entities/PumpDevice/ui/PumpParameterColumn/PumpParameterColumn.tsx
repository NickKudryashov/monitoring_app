import { ReactElement } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./PumpParameterColumn.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { HeatParameters } from "entities/Heatcounters";
import classNames from "shared/lib/classNames/classNames";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
interface PumpParameterColumnProps {
    params: PumpParameter[];
    header: string;
    fullWidth?: boolean;
    onParameterClick?: (parameter: PumpParameter) => void;
}

export function PumpParameterColumn(
    props: PumpParameterColumnProps
): ReactElement {
    const { header, params, onParameterClick, fullWidth = false } = props;
    return (
        <VFlexBox
            width={fullWidth ? "100%" : "45%"}
            height={fullWidth ? "80%" : "45%"}
            alignItems="center"
            className={cls.paramFlexBox}
        >
            <p className={classNames(cls.sysHeader, {}, [cls.paramBoxHeader])}>
                {header}
            </p>
            <VFlexBox className={cls.rows} height="80%">
                {params?.map((elem) => (
                    <HFlexBox
                        onClick={() => onParameterClick(elem)}
                        height={"10%"}
                        className={cls.paramRow}
                        key={elem.id}
                        alignItems="end"
                        align="space-around"
                    >
                        <div className={cls.paramVerboseWrapper}>
                            <p>{elem.verbose_name}</p>
                        </div>
                        <HFlexBox
                            alignItems="center"
                            align="space-around"
                            className={cls.paramValueWrapper}
                            width={"20%"}
                        >
                            <p className={cls.valueField}>{elem.value}</p>
                        </HFlexBox>
                    </HFlexBox>
                ))}
            </VFlexBox>
        </VFlexBox>
    );
}
