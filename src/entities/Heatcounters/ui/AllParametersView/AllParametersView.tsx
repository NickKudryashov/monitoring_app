import { HeatDevice, HeatParameters } from "entities/Heatcounters/types/type";
import { ReactElement, memo } from "react";
import { ParameterColumnBySystem } from "../ParameterColumnBySystem/ParameterColumnBySystem";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";

export const AllParametersView = memo(
    (props: {
        heatDevice: HeatDevice;
        onParameterClick?: (parameter: HeatParameters) => void;
        className?: string;
    }): ReactElement => {
        const { heatDevice, onParameterClick, className } = props;
        return (
            <HFlexBox className={className}>
                {heatDevice &&
                    heatDevice?.systems?.map((system) => (
                        <ParameterColumnBySystem
                            key={system.id}
                            params={system.parameters}
                            header={system.name}
                            onParameterClick={onParameterClick}
                        />
                    ))}
            </HFlexBox>
        );
    }
);
