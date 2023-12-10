import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./ParameterView.module.scss";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import classNames from "shared/lib/classNames/classNames";
import { ConfigurationParameterAnswer } from "pages/HeatSubcategoryPage/api/api";
import { HeatParameters } from "entities/Heatcounters";
import { ParametersDict } from "../HeatSubcategoryPage/HeatSubcategoryPage";
import { ParameterColumn } from "../ParameterColumn/ParameterColumn";
import { ConfigParameterColumn } from "../ConfigParameterColumn/ConfigParameterColumn";

export const PARAMBOX_MAPPER:Record<string,string> = {
    "instant_parameter":"Мгновенные параметры",
    "accumulate_parameter":"Накопленные параметры",
};

interface ParameterViewProps {
    configParameters:ConfigurationParameterAnswer[];
    params:ParametersDict;
    className?:string;
}

export function ParameterView(props:ParameterViewProps): React.ReactElement {
    const {configParameters,params,className} = props;
    return (
        <HFlexBox className={classNames(cls.paramGroups,{},[className,])} gap="10px" align="space-around" alignItems="center">
            {Object.keys(PARAMBOX_MAPPER).map((el) =>
                <ParameterColumn key={el} params={params[el]} header={PARAMBOX_MAPPER[el]}/>
            )}
            <ConfigParameterColumn configParameters={configParameters} />
        </HFlexBox>

    );
}
