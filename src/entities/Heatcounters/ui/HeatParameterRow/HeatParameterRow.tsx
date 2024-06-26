import { useState } from "react";
import { HeatParameters } from "../../types/type";
import { useDebounce } from "shared/hooks/useDebounce";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./HeatParameterRow.module.scss";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import classNames from "shared/lib/classNames/classNames";
import { editHeatParameterName } from "entities/Heatcounters/api/heatcountersapi";
interface HeatParameterRowProps {
    elem: HeatParameters;
    onParameterClick?: (parameter: HeatParameters) => void;
}
export const HeatParameterRow = (props: HeatParameterRowProps) => {
    const { elem, onParameterClick } = props;
    const [paramName, setParamName] = useState(elem.name);
    const [edit] = editHeatParameterName();
    const debouncedEdit = useDebounce(edit, 1500);
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParamName(e.target.value);
        debouncedEdit({ id: elem.id, comment: e.target.value });
    };
    return (
        <HFlexBox
            height={"10%"}
            className={cls.paramRow}
            alignItems="end"
            align="space-around"
            onClick={() => onParameterClick(elem)}
        >
            <div className={cls.paramVerboseWrapper}>
                <AppInput
                    className={cls.inp}
                    theme={InputThemes.CLEAR}
                    value={paramName}
                    onChange={onNameChange}
                />
            </div>
            <p className={cls.paramNameField}>{elem.tag}</p>
            <HFlexBox
                alignItems="center"
                align="space-around"
                className={classNames(
                    cls.paramValueWrapper,
                    { [cls.redMark]: !elem.updated },
                    []
                )}
                width={"30%"}
            >
                <p className={classNames(cls.valueField, {}, [])}>
                    {elem.value}
                </p>
                <p className={cls.dimensionField}>{elem.dimension}</p>
            </HFlexBox>
        </HFlexBox>
    );
};
