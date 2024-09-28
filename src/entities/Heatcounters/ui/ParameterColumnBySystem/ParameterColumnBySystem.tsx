import { ReactElement, useCallback, useMemo } from "react";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumnBySystem.module.scss";
import { HeatParameterRow } from "../HeatParameterRow/HeatParameterRow";
import { HeatParameters } from "../../types/type";
import classNames from "@/shared/lib/classNames/classNames";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
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
    const isMobile = useMobilDeviceDetect();
    const preSelected = useCallback(
        (id: number) => {
            return selectedParametersIDs?.includes(id);
        },
        [selectedParametersIDs],
    );
    return (
        <VFlexBox
            width={isMobile ? "90%" : "45%"}
            height={isMobile ? "auto" : "45%"}
            alignItems="center"
            className={cls.paramFlexBox}
        >
            {/* <div className={cls.paramBoxHeader}> */}
            <p
                className={classNames(cls.sysHeader, {}, [cls.paramBoxHeader])}
            >{`ПАРАМЕТРЫ КОНТУРА ${header}`}</p>
            {/* </div> */}
            <VFlexBox
                className={cls.rows}
                height="80%"
                gap="5px"
                align="space-around"
            >
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
