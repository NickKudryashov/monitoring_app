import { ReactElement, useCallback, useEffect, useState } from "react";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./ParameterRow.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { AutoParameter } from "entities/AutomaticDevice/model/types/AutomaticDeviceTypes";
interface ParameterRowProps {
    parameter: AutoParameter;
    detailInfo?: boolean;
    className?: string;
    onParameterClick?: (parameter: AutoParameter) => void;
    onParameterUnClick?: (parameter: AutoParameter) => void;
    preSelected?: boolean;
}
export const ParameterRow = (props: ParameterRowProps): ReactElement => {
    const {
        parameter,
        className = "",
        onParameterClick,
        onParameterUnClick,
        preSelected,
        detailInfo = false,
    } = props;

    const [selected, setSelected] = useState(preSelected);
    useEffect(() => {
        setSelected(preSelected);
    }, [preSelected]);

    const onParameterClickHandler = useCallback(() => {
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
            className={classNames(cls.paramRow, { [cls.selected]: selected }, [
                className,
            ])}
            alignItems="end"
            align="space-between"
            height="55px"
            onClick={onParameterClickHandler}
        >
            <div
                className={classNames(cls.paramVerboseWrapper, {
                    [cls.paramVerboseWrapperWide]: !detailInfo,
                })}
            >
                <p>{parameter.verbose}</p>
            </div>
            {detailInfo && (
                <div
                    className={classNames(cls.paramVerboseWrapper, {}, [
                        cls.tagWrap,
                    ])}
                >
                    <p>{parameter.tag}</p>
                </div>
            )}
            <HFlexBox
                alignItems="center"
                align="space-around"
                className={cls.paramValueWrapper}
                height="80%"
                width={"15%"}
            >
                <p className={cls.valueField}>{parameter.value}</p>
            </HFlexBox>
        </HFlexBox>
    );
};
