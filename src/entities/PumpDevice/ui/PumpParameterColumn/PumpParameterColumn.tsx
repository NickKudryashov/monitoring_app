import { ReactElement, useCallback } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./PumpParameterColumn.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { HeatParameters } from "entities/Heatcounters";
import classNames from "shared/lib/classNames/classNames";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
import { ParameterRow } from "../ParameterRow/ParameterRow";
interface PumpParameterColumnProps {
    params: PumpParameter[];
    header: string;
    fullWidth?: boolean;
    onParameterClick?: (parameter: PumpParameter) => void;
    onParameterUnClick?: (parameter: PumpParameter) => void;
    selectedParametersIDs?: number[];
}

export function PumpParameterColumn(
    props: PumpParameterColumnProps
): ReactElement {
    const {
        header,
        params,
        onParameterClick,
        onParameterUnClick,
        selectedParametersIDs,
        fullWidth = false,
    } = props;
    const checkSelected = useCallback(
        (id) => {
            return selectedParametersIDs?.includes(id);
        },
        [selectedParametersIDs]
    );
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
                    <ParameterRow
                        parameter={elem}
                        key={elem.id}
                        onParameterClick={onParameterClick}
                        onParameterUnClick={onParameterUnClick}
                        preSelected={checkSelected(elem.id)}
                    />
                ))}
            </VFlexBox>
        </VFlexBox>
    );
}
