import { ReactElement } from "react";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumnBySystem.module.scss";
import { HeatParameterRow, HeatParameters } from "entities/Heatcounters";
import classNames from "shared/lib/classNames/classNames";
interface ParameterColumnBySystemProps {
    params: HeatParameters[];
    header: string;
    onParameterClick?: (parameter: HeatParameters) => void;
}

export function ParameterColumnBySystem(
    props: ParameterColumnBySystemProps
): ReactElement {
    const { header, params, onParameterClick } = props;

    return (
        <VFlexBox
            width={"45%"}
            height={"45%"}
            alignItems="center"
            className={cls.paramFlexBox}
        >
            {/* <div className={cls.paramBoxHeader}> */}
            <p
                className={classNames(cls.sysHeader, {}, [cls.paramBoxHeader])}
            >{`ПАРАМЕТРЫ КОНТУРА ${header}`}</p>
            {/* </div> */}
            <VFlexBox className={cls.rows} height="80%">
                {params?.map((elem) => (
                    <HeatParameterRow
                        key={elem.id}
                        elem={elem}
                        onParameterClick={onParameterClick}
                    />
                ))}
            </VFlexBox>
        </VFlexBox>
    );
}
