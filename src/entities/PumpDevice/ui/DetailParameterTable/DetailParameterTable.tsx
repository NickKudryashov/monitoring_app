import {
    PumpErrorDetail,
    PumpParameter,
} from "entities/PumpDevice/model/types/pumpDevice";
import { ReactElement } from "react";
import classNames from "shared/lib/classNames/classNames";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./DetailParameterTable.module.scss";
interface DetailParameterProps {
    params?: PumpParameter[];
    errors?: PumpErrorDetail[];
    header: string;
    className?: string;
}
export function DetailParameter(props: DetailParameterProps): ReactElement {
    const { header, params, errors, className = "" } = props;
    return (
        <VFlexBox
            height="90%"
            width="80%"
            alignItems="center"
            className={classNames(cls.detail, {}, [className])}
        >
            <p className={classNames(cls.sysHeader, {}, [cls.paramBoxHeader])}>
                {header}
            </p>
            <VFlexBox className={cls.rows} height="80%">
                {errors &&
                    errors?.map((elem) => (
                        <HFlexBox
                            height={"5%"}
                            key={elem.id}
                            alignItems="end"
                            align="space-around"
                        >
                            <HFlexBox
                                width="70%"
                                className={cls.paramVerboseWrapper}
                            >
                                <p>{elem.translate}</p>
                            </HFlexBox>
                            <HFlexBox
                                alignItems="center"
                                align="space-around"
                                className={cls.paramValueWrapper}
                                width={"12%"}
                            >
                                <p className={cls.valueField}>{elem.value}</p>
                            </HFlexBox>
                        </HFlexBox>
                    ))}
                {params &&
                    params?.map((elem) => (
                        <HFlexBox
                            height={"5%"}
                            key={elem.id}
                            alignItems="end"
                            align="space-around"
                        >
                            <HFlexBox
                                width="70%"
                                className={cls.paramVerboseWrapper}
                            >
                                <p>{elem.verbose_name}</p>
                            </HFlexBox>
                            <HFlexBox
                                alignItems="center"
                                align="space-around"
                                className={cls.paramValueWrapper}
                                width={"10%"}
                            >
                                <p className={cls.valueField}>{elem.value}</p>
                            </HFlexBox>
                        </HFlexBox>
                    ))}
            </VFlexBox>
        </VFlexBox>
    );
}
