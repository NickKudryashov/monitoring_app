import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./ParameterView.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { ParameterColumnBySystem } from "entities/Heatcounters";
import { ParametersDict } from "../HeatSubcategoryPage/HeatSubcategoryPage";

export const PARAMBOX_MAPPER: Record<string, string> = {
    instant_parameter: "Мгновенные параметры",
    accumulate_parameter: "Накопленные параметры",
};

interface ParameterViewProps {
    params: ParametersDict;
    className?: string;
}

export function ParameterView(props: ParameterViewProps): React.ReactElement {
    const { params, className } = props;
    return (
        <HFlexBox
            className={classNames(cls.paramGroups, {}, [className])}
            align="flex-start"
            alignItems="start"
        >
            {Object?.values(params ?? {})?.map((el, i) => (
                <ParameterColumnBySystem
                    key={i}
                    params={el.parameters}
                    header={el.systemName}
                />
            ))}
            {/* <ConfigParameterColumn configParameters={configParameters} /> */}
        </HFlexBox>
    );
}
