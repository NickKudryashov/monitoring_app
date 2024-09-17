import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./SystemCard.module.scss";
import { HeatSystem } from "@/entities/Heatcounters";

interface SystemCardProps {
    system:HeatSystem
}

export function SystemCard (props:SystemCardProps) :React.ReactElement {
    const {system} = props;
    return(
        <HFlexBox>
            <VFlexBox className={cls.systemCardFlexInfoPart}>
                <p className={cls.systemCardTitle}>
                    {`ТЕПЛОВАЯ СИСТЕМА ${system.index+1}`}
                </p>
                <p className={cls.systemNameField}>
                    {system.name}
                </p>
                <div className={cls.systemInformation}>
                    <VFlexBox gap={"5px"}>
                        <div>
                            <p>СХЕМА</p>
                            <p>{system.schema}</p>
                        </div>
                        <div>
                            <p>ФОРМУЛА</p>
                            <p>{system.formula}</p>

                        </div>
                    </VFlexBox>

                </div>
            </VFlexBox>
            <VFlexBox gap="5px" align="center" alignItems="center">
                <p>АВАРИИ</p>
                <div className={cls.eventWrapper}>
                    0
                </div>
                <p>СОБЫТИЯ</p>
                <div className={cls.eventWrapper}>
                    0
                </div>
            </VFlexBox>
        </HFlexBox>
    );
} 