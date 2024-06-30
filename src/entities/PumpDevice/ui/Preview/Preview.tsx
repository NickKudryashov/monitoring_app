import { ReactElement } from "react";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./Preview.module.scss";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
export const Preview = (props: {
    parameters: PumpParameter[];
}): ReactElement => {
    const { parameters } = props;
    return (
        <VFlexBox
            alignItems="center"
            align="space-around"
            className={cls.previewBox}
        >
            {parameters.map((el) => (
                <HFlexBox
                    align="space-around"
                    alignItems="center"
                    height="20%"
                    className={cls.preview}
                    key={el.id}
                >
                    <p className={cls.previewName}>{el.verbose_name}</p>
                    <p className={cls.previewVal}>{el.value}</p>
                </HFlexBox>
            ))}
        </VFlexBox>
    );
};
