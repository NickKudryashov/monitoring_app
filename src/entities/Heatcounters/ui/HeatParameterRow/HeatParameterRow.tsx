import { useCallback, useEffect, useState } from "react";
import { HeatParameters } from "../../types/type";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./HeatParameterRow.module.scss";
import { AppInput, InputThemes } from "@/shared/ui/AppInput/AppInput";
import classNames from "@/shared/lib/classNames/classNames";
import { editHeatParameterName } from "../../api/heatcountersapi";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
interface HeatParameterRowProps {
    elem: HeatParameters;
    onParameterClick?: (parameter: HeatParameters) => void;
    onParameterUnClick?: (parameter: HeatParameters) => void;
    preSelected?: boolean;
}
export const HeatParameterRow = (props: HeatParameterRowProps) => {
    const { elem, onParameterClick, onParameterUnClick, preSelected } = props;
    const [paramName, setParamName] = useState(elem.name);
    const [selected, setSelected] = useState(preSelected);
    const [edit] = editHeatParameterName();
    const debouncedEdit = useDebounce(edit, 1500);
    const isMobile = useMobilDeviceDetect();
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParamName(e.target.value);
        debouncedEdit({ id: elem.id, comment: e.target.value });
    };

    useEffect(() => {
        setSelected(preSelected);
    }, [preSelected]);

    const onClickHandler = useCallback(() => {
        if (selected) {
            if (onParameterUnClick) {
                onParameterUnClick(elem);
            }
        } else {
            if (onParameterClick) {
                onParameterClick(elem);
            }
        }
        if (onParameterClick && onParameterUnClick) {
            setSelected((prev) => !prev);
        }
    }, [elem, onParameterClick, onParameterUnClick, selected]);
    return (
        <HFlexBox
            className={classNames(
                cls.paramRow,
                { [cls.selected]: selected },
                [],
            )}
            alignItems="center"
            align="space-around"
            onClick={onClickHandler}
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
                align="center"
                gap="5px"
                className={classNames(
                    cls.paramValueWrapper,
                    { [cls.redMark]: !elem.updated },
                    [],
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
