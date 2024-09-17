import classNames from "@/shared/lib/classNames/classNames";
import { memo, useState } from "react";
import cls from "./ElectroCounterDeviceDetail.module.scss";

import type { PropsWithChildren } from "react";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { ElectroCounterDetailView } from "../ElectroCounterDetailView/ElectroCounterDetailView";
import { getElectroDeviceCountersByCan } from "@/entities/ElectroDevice/api/electroDeviceApi";
import {
    Dict,
    TopLevelDeviceStatistic,
} from "@/entities/ElectroDevice/model/types/electroDevice";

interface ElectroCounterDeviceDetailProps {
    className?: string;
    dev_id: string;
    stat?: Dict<TopLevelDeviceStatistic>;
    devname: string;
}

export const ElectroCounterDeviceDetail = memo(
    (props: PropsWithChildren<ElectroCounterDeviceDetailProps>) => {
        const { className = "", dev_id, devname, stat } = props;
        const [currentCan, setCurrentCan] = useState<string>("");
        const { data: counters, isLoading: counterIsLoading } =
            getElectroDeviceCountersByCan({
                id: dev_id,
                counterInterface: currentCan,
            });
        const canChangeHandler = (can: string) => {
            setCurrentCan((prev) => {
                if (prev === can) {
                    return "";
                }
                return can;
            });
        };

        return (
            <VFlexBox
                gap="5px"
                className={classNames(cls.main, {}, [className])}
            >
                {stat &&
                    Object.keys(stat).map((el) => (
                        <VFlexBox
                            height={el === currentCan ? "80%" : "10%"}
                            key={el}
                        >
                            <HFlexBox
                                onClick={() => canChangeHandler(el)}
                                align="space-around"
                                alignItems="center"
                                height={el === currentCan ? "12%" : "100%"}
                                className={classNames(
                                    cls.canHeader,
                                    { [cls.selectedCan]: el === currentCan },
                                    []
                                )}
                            >
                                <HFlexBox
                                    width="45%"
                                    gap="10px"
                                    alignItems="center"
                                >
                                    <p>{devname}</p>
                                    <p>{el}</p>
                                    <p className={cls.canVerbDev}>
                                        {stat[el].verbose}
                                    </p>
                                </HFlexBox>
                                <HFlexBox
                                    width="40%"
                                    alignItems="center"
                                    align="space-around"
                                >
                                    <p>{`всего: ${stat[el].count}`}</p>
                                    <p>{`опрошены: ${stat[el].success}`}</p>
                                    <p>{`не опрошены: ${stat[el].failed}`}</p>
                                </HFlexBox>
                            </HFlexBox>
                            {el === currentCan && !counterIsLoading && (
                                <VFlexBox
                                    height="88%"
                                    gap="5px"
                                    className={cls.countersField}
                                >
                                    {counters?.map((counter) => (
                                        <ElectroCounterDetailView
                                            className={cls.row}
                                            key={counter.id}
                                            counter={counter}
                                        />
                                    ))}
                                </VFlexBox>
                            )}
                        </VFlexBox>
                    ))}
            </VFlexBox>
        );
    }
);
