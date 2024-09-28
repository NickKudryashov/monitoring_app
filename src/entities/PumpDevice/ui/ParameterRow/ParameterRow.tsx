import { ReactElement, useCallback, useEffect, useState } from "react";
import cls from "./ParameterRow.module.scss";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { PumpParameter } from "@/entities/PumpDevice/model/types/pumpDevice";
import classNames from "@/shared/lib/classNames/classNames";
interface ParameterRowProps {
    parameter: PumpParameter;
    onParameterClick?: (parameter: PumpParameter) => void;
    onParameterUnClick?: (parameter: PumpParameter) => void;
    preSelected?: boolean;
}
export const ParameterRow = (props: ParameterRowProps): ReactElement => {
    const { parameter, onParameterClick, onParameterUnClick, preSelected } =
        props;
    const [selected, setSelected] = useState(preSelected);
    useEffect(() => {
        setSelected(preSelected);
    }, [preSelected]);

    const onClickHandler = useCallback(() => {
        if (selected) {
            if (onParameterUnClick) {
                onParameterUnClick(parameter);
            }
        } else {
            if (onParameterClick) {
                onParameterClick(parameter);
            }
        }
        if (onParameterClick && onParameterUnClick) {
            setSelected((prev) => !prev);
        }
    }, [onParameterClick, onParameterUnClick, parameter, selected]);

    return (
        <HFlexBox
            onClick={onClickHandler}
            height={"10%"}
            className={classNames(
                cls.paramRow,
                { [cls.selected]: selected },
                [],
            )}
            alignItems="center"
            align="space-around"
        >
            <div className={cls.paramVerboseWrapper}>
                <p>{parameter.verbose_name}</p>
            </div>
            <HFlexBox
                alignItems="center"
                align="space-around"
                className={cls.paramValueWrapper}
                width={"20%"}
            >
                <p className={cls.valueField}>{parameter.value}</p>
            </HFlexBox>
        </HFlexBox>
    );
};
