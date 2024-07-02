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
        onParameterClick: (parameter: PumpParameter) => void;
        className?: string;
    }): ReactElement => {
        const { onParameterClick, pumpDevice, className } = props;
        return (
            <HFlexBox className={className}>
                {pumpDevice &&
                    Object.keys(pumpDevice?.parametersByGroup)?.map(
                        (group, i) => (
                            <PumpParameterColumn
                                key={i}
                                header={group}
                                onParameterClick={onParameterClick}
                                params={pumpDevice.parametersByGroup[group]}
                            />
                        )
                    )}
            </HFlexBox>
        );
    }
);
