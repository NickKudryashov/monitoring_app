import { ReactElement, memo } from "react";
import { PumpParameterColumn } from "../PumpParameterColumn/PumpParameterColumn";
import {
    PumpDeviceData,
    PumpParameter,
} from "entities/PumpDevice/model/types/pumpDevice";
import { PumpDeviceProps } from "../PumpDevice";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";

export const ParametersComposition = memo(
    (props: {
        pumpDevice: PumpDeviceData;
        onParameterClick?: (parameter: PumpParameter) => void;
        onParameterUnClick?: (parameter: PumpParameter) => void;
        selectedParametersIDs?: number[];
        className?: string;
    }): ReactElement => {
        const {
            onParameterClick,
            pumpDevice,
            className,
            onParameterUnClick,
            selectedParametersIDs,
        } = props;
        return (
            <HFlexBox className={className}>
                {pumpDevice &&
                    Object.keys(pumpDevice?.parametersByGroup)?.map(
                        (group, i) => (
                            <PumpParameterColumn
                                key={i}
                                header={group}
                                onParameterClick={onParameterClick}
                                onParameterUnClick={onParameterUnClick}
                                selectedParametersIDs={selectedParametersIDs}
                                params={pumpDevice.parametersByGroup[group]}
                            />
                        )
                    )}
            </HFlexBox>
        );
    }
);
