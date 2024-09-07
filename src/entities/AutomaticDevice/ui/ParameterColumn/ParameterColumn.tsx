import { ReactElement, useCallback } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumn.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import classNames from "shared/lib/classNames/classNames";
import {
    AutoParameter,
    ParamRecord,
} from "../../model/types/AutomaticDeviceTypes";
import { ParameterRow } from "../ParameterRow/ParameterRow";
interface ParameterColumnProps {
    params: ParamRecord[];
    header: string;
    fullWidth?: boolean;
    fullHeight?: boolean;
    detail?: boolean;
    className?: string;
    onParameterClick?: (parameter: AutoParameter) => void;
    onParameterUnClick?: (parameter: AutoParameter) => void;
    selectedParametersIDs?: number[];
}

export function ParameterColumn(props: ParameterColumnProps): ReactElement {
    const {
        params,
        className,
        header,
        onParameterClick,
        onParameterUnClick,
        selectedParametersIDs,
        fullWidth = false,
        fullHeight = false,
        detail = false,
    } = props;
    const preSelected = useCallback(
        (id: number) => {
            return selectedParametersIDs?.includes(id);
        },
        [selectedParametersIDs]
    );
    return (
        <VFlexBox
            width={fullWidth ? "100%" : "45%"}
            height={fullHeight ? "100%" : "45%"}
            alignItems="center"
            className={cls.paramFlexBox}
        >
            {/* <div className={cls.paramBoxHeader}> */}
            <p className={classNames(cls.sysHeader, {}, [cls.paramBoxHeader])}>
                {header}
            </p>
            {/* </div> */}
            <VFlexBox align="space-around" className={cls.rows} height="95%">
                {params?.map((elem, i) => (
                    <VFlexBox
                        className={cls.groupWrap}
                        width="90%"
                        gap="5px"
                        height={`${50 * elem.parameters.length + 90}px`}
                        key={i}
                    >
                        <p className={cls.groupLabel}>{elem.name}</p>
                        {elem.parameters.map((param) => (
                            <ParameterRow
                                onParameterClick={onParameterClick}
                                onParameterUnClick={onParameterUnClick}
                                className={cls.row}
                                key={param.id}
                                parameter={param}
                                detailInfo={detail}
                                preSelected={preSelected(param.id)}
                            />
                        ))}
                    </VFlexBox>
                ))}
            </VFlexBox>
        </VFlexBox>
    );
}
