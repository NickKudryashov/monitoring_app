import { ReactElement } from "react";
import classNames from "@/shared/lib/classNames/classNames";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ConfigParameterColumn.module.scss";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { ConfigurationParameterAnswer } from "@/pages/HeatSubcategoryPage/api/api";
export function ConfigParameterColumn(props: {
    configParameters: ConfigurationParameterAnswer[];
    className?: string;
}): ReactElement {
    const { configParameters, className = "" } = props;
    return (
        <VFlexBox
            className={classNames(cls.content, {}, [className])}
            alignItems="center"
        >
            <VFlexBox width={"90%"} height={"90%"} className={cls.paramFlexBox}>
                <p
                    className={classNames(cls.sysHeader, {}, [
                        cls.paramBoxHeader,
                    ])}
                >
                    {"ПРЕДУСТАНОВЛЕННЫЕ ПАРАМЕТРЫ"}
                </p>
                <VFlexBox alignItems="center" gap="7px">
                    <HFlexBox height={"7%"} align="space-around">
                        <p className={cls.devNameField}>название прибора</p>
                        <p className={cls.devNumfield}>номер прибора</p>
                        <p className={cls.tagfield}>Тег</p>
                        <p className={cls.devNumfield}>min значение</p>
                        <p className={cls.devNumfield}>max значение</p>
                    </HFlexBox>
                    {configParameters?.map((elem, i) => (
                        <HFlexBox
                            height="6%"
                            key={i}
                            gap="5px"
                            align="space-around"
                        >
                            <p className={cls.devNameFieldExtended}>МОК</p>
                            <p className={cls.devNumieldExtended}>
                                {elem.gnum}
                            </p>
                            <p className={cls.tagFieldExtended}>{elem.name}</p>
                            <p className={cls.devNumieldExtended}>{elem.min}</p>
                            <p className={cls.devNumieldExtended}>{elem.max}</p>
                        </HFlexBox>
                    ))}
                </VFlexBox>
            </VFlexBox>
        </VFlexBox>
    );
}
