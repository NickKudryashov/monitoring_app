import { ReactElement, useCallback, useMemo } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumnBySystem.module.scss";
import { HeatParameterRow } from "../HeatParameterRow/HeatParameterRow";
import { HeatParameters } from "../../types/type";
import classNames from "shared/lib/classNames/classNames";
interface ParameterColumnBySystemProps {
    params: HeatParameters[];
    header: string;
    onParameterClick?: (parameter: HeatParameters) => void;
    onParameterUnClick?: (parameter: HeatParameters) => void;
    selectedParametersIDs?: number[];
}

export function ParameterColumnBySystem(
    props: ParameterColumnBySystemProps,
): ReactElement {
    const {
        header,
        params,
        onParameterClick,
        onParameterUnClick,
        selectedParametersIDs,
    } = props;
    const preSelected = useCallback(
        (id: number) => {
            return selectedParametersIDs?.includes(id);
        },
        [selectedParametersIDs],
    );
    return (
        <VFlexBox
            width={"45%"}
            height={"45%"}
            alignItems="center"
            className={cls.paramFlexBox}
        >
            {/* <div className={cls.paramBoxHeader}> */}
            <p
                className={classNames(cls.sysHeader, {}, [cls.paramBoxHeader])}
            >{`ПАРАМЕТРЫ КОНТУРА ${header}`}</p>
            {/* </div> */}
            <VFlexBox className={cls.rows} height="80%">
                {params?.map((elem) => (
                    <HeatParameterRow
                        key={elem.id}
                        elem={elem}
                        onParameterClick={onParameterClick}
                        onParameterUnClick={onParameterUnClick}
                        preSelected={preSelected(elem.id)}
                    />
                ))}
            </VFlexBox>
        </VFlexBox>
    );
}
