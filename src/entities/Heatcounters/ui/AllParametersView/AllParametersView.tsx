import { HeatDevice, HeatParameters } from "../../types/type";
import { ReactElement, memo } from "react";
import { ParameterColumnBySystem } from "../ParameterColumnBySystem/ParameterColumnBySystem";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";

export const AllParametersView = memo(
    (props: {
        heatDevice: HeatDevice;
        onParameterClick?: (parameter: HeatParameters) => void;
        onParameterUnClick?: (parameter: HeatParameters) => void;
        className?: string;
        selectedParametersIDs?: number[];
    }): ReactElement => {
        const {
            heatDevice,
            onParameterClick,
            onParameterUnClick,
            className,
            selectedParametersIDs,
        } = props;
        return (
            <HFlexBox className={className}>
                {heatDevice &&
                    heatDevice?.systems?.map((system) => (
                        <ParameterColumnBySystem
                            key={system.id}
                            params={system.parameters}
                            header={system.name}
                            onParameterClick={onParameterClick}
                            onParameterUnClick={onParameterUnClick}
                            selectedParametersIDs={selectedParametersIDs}
                        />
                    ))}
            </HFlexBox>
        );
    },
);

AllParametersView.displayName = "HeatDeviceAllParameterView";
