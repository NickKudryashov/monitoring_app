import classNames from "@/shared/lib/classNames/classNames";
import { memo, useState } from "react";
import cls from "./ElectroStatistic.module.scss";

import type { PropsWithChildren } from "react";
import { timeConvert } from "@/shared/lib/helpers/datetimeConvert";
import { AppButon, AppButtonTheme } from "@/shared/ui/AppButton/AppButton";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";

interface ElectroStatisticProps {
    className?: string;
    last_poll_seconds: number | undefined;
    last_update: string;
    autoPollMode: boolean | undefined;
    pollInterval: number | undefined;
    id: number;
    setAutoPollmode?: (a: boolean) => void;
    setPollInterval?: (a: number) => void;
    onEdit?: () => void;
}

export const ElectroStatistic = memo(
    (props: PropsWithChildren<ElectroStatisticProps>) => {
        const {
            className = "",
            last_poll_seconds,
            last_update,
            autoPollMode,
            pollInterval,
            onEdit,
            setAutoPollmode,
            setPollInterval,
            id,
        } = props;
        const [autoFlag, setAutoFlag] = useState(autoPollMode);
        const isMobile = useMobilDeviceDetect();
        const mods = {
            [cls.inverted]: !autoFlag,
        };
        return (
            <VFlexBox
                align="space-between"
                height="32%"
                className={classNames(cls.titleBlock, {}, [className])}
            >
                <HFlexBox
                    height="17%"
                    className={cls.headerBlock}
                    align="center"
                    alignItems="center"
                >
                    <p>{"Название прибора"}</p>
                </HFlexBox>
                <VFlexBox
                    align="space-around"
                    className={cls.data}
                    height="78%"
                >
                    <HFlexBox
                        width={isMobile ? "100%" : "50%"}
                        align="space-between"
                        gap="30px"
                        height="20%"
                    >
                        <p
                            className={classNames(cls.item, {}, [
                                cls.datetimeItem,
                            ])}
                        >
                            ДАТА ПОСЛЕДНЕГО ОПРОСА
                        </p>
                        <HFlexBox
                            width="33%"
                            height="70%"
                            className={classNames(cls.field, {}, [cls.dtfield])}
                        >
                            {timeConvert(last_update)}
                        </HFlexBox>
                    </HFlexBox>
                    <HFlexBox
                        width={isMobile ? "100%" : "50%"}
                        align="space-between"
                        gap="30px"
                        height="20%"
                    >
                        <p className={cls.item}>
                            ДЛИТЕЛЬНОСТЬ ПРЕДЫДУЩЕГО ОПРОСА
                        </p>
                        <HFlexBox width="33%" height="70%">
                            <HFlexBox width="50%" className={cls.field}>
                                {last_poll_seconds
                                    ? Math.round(last_poll_seconds / 60)
                                    : "не опрашивался"}
                            </HFlexBox>
                        </HFlexBox>
                    </HFlexBox>
                    <HFlexBox
                        width={isMobile ? "100%" : "50%"}
                        align="space-between"
                        gap="30px"
                        height="20%"
                    >
                        <p className={cls.item}>ВЫКЛЮЧИТЬ АВТООПРОС</p>
                        <HFlexBox width="33%" height="70%">
                            <HFlexBox
                                onClick={() => setAutoFlag((prev) => !prev)}
                                width="50%"
                                className={classNames(cls.field, mods, [])}
                            >
                                {autoPollMode ?? "не задан"}
                            </HFlexBox>
                        </HFlexBox>
                    </HFlexBox>
                    <HFlexBox
                        width={isMobile ? "100%" : "50%"}
                        align="space-between"
                        gap="30px"
                        height="20%"
                    >
                        <p className={cls.item}>
                            ИНТЕРВАЛ АВТООПРОСА В МИНУТАХ
                        </p>
                        <HFlexBox width="33%" height="70%">
                            <HFlexBox width="50%" className={cls.field}>
                                {pollInterval ?? "не задан"}
                            </HFlexBox>
                        </HFlexBox>
                    </HFlexBox>
                </VFlexBox>
            </VFlexBox>
        );
    },
);

ElectroStatistic.displayName = "ElectroStatisticBlock";
