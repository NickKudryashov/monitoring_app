import { ParameterColumn as AutoParameterColumn } from "../ParameterColumn/ParameterColumn";
import {
    AutoParameter,
    AutomaticDeviceData,
} from "../../model/types/AutomaticDeviceTypes";
import { ReactElement, memo } from "react";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";

export const ParameterComposition = memo(
    (props: {
        autoDevice: AutomaticDeviceData;
        onParameterClick?: (parameter: AutoParameter) => void;
        onParameterUnClick?: (parameter: AutoParameter) => void;
        selectedParametersIDs?: number[];
        className?: string;
    }): ReactElement => {
        const {
            autoDevice,
            onParameterClick,
            className,
            onParameterUnClick,
            selectedParametersIDs,
        } = props;
        return (
            <HFlexBox className={className}>
                {autoDevice &&
                    Object.values(autoDevice?.resultParamGroup).map(
                        (parameter, i) => (
                            <AutoParameterColumn
                                key={i}
                                header={"Контур"}
                                fullHeight
                                params={parameter}
                                onParameterClick={onParameterClick}
                                onParameterUnClick={onParameterUnClick}
                                selectedParametersIDs={selectedParametersIDs}
                            />
                        ),
                    )}
            </HFlexBox>
        );
    },
);
ParameterComposition.displayName = "AutomaticDevParameterComposition";
