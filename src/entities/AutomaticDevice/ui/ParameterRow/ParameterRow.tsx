import { ReactElement } from "react";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./ParameterRow.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { AutoParameter } from "entities/AutomaticDevice/model/types/AutomaticDeviceTypes";
interface ParameterRowProps {
    parameter: AutoParameter;
    detailInfo?: boolean;
    className?: string;
    onParameterClick?: (parameter: AutoParameter) => void;
}
export const ParameterRow = (props: ParameterRowProps): ReactElement => {
    const {
        parameter,
        className,
        onParameterClick,
        detailInfo = false,
    } = props;
    return (
        <HFlexBox
            className={classNames(cls.paramRow, {}, [className])}
            alignItems="end"
            align="space-between"
            onClick={() => onParameterClick(parameter)}
        >
            <div className={cls.paramVerboseWrapper}>
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
                width={"15%"}
            >
                <p className={cls.valueField}>{parameter.value}</p>
            </HFlexBox>
        </HFlexBox>
    );
};
