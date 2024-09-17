import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./SystemCard.module.scss";
import {
    AutomaticDeviceData,
    AutoParameter,
} from "@/entities/AutomaticDevice/model/types/AutomaticDeviceTypes";

interface SystemCardProps {
    params: Record<number, AutoParameter[]>;
    index: number;
}

export function SystemCard(props: SystemCardProps): React.ReactElement {
    const { params, index } = props;

    return (
        <HFlexBox height="45%" className={cls.card}>
            <VFlexBox className={cls.systemCardFlexInfoPart}>
                <p className={cls.systemCardTitle}>
                    {index === 0 ? "ОБЩИЕ" : "КОНТУР №" + index}
                </p>
                {params[index].map((param) => (
                    <HFlexBox
                        height={"9%"}
                        className={cls.paramRow}
                        key={param.id}
                        alignItems="end"
                        align="space-between"
                    >
                        <p className={cls.paramNameField}>{param.verbose}</p>
                        {/* <p className={cls.paramTagField}>{param.tag}</p> */}
                        <div className={cls.paramValueWrapper}>
                            <p>{`${param.value} ${param.dimension}`}</p>
                        </div>
                        {/* <div className={cls.paramVerboseWrapper}>
                                    <p>{param.verbose}</p>
                                </div> */}
                    </HFlexBox>
                ))}
            </VFlexBox>
        </HFlexBox>
    );
}
