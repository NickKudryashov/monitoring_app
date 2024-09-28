import classNames from "@/shared/lib/classNames/classNames";
import { memo, useState } from "react";
import cls from "./ElectroCounterDetailView.module.scss";

import type { PropsWithChildren } from "react";
import { ElectroCounter } from "@/entities/ElectroDevice/model/types/electroDevice";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { renameElectroCounter } from "@/entities/ElectroDevice/api/electroDeviceApi";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";

interface ElectroCounterDetailViewProps {
    className?: string;
    counter: ElectroCounter;
    height?: string;
}

export const ElectroCounterDetailView = memo(
    (props: PropsWithChildren<ElectroCounterDetailViewProps>) => {
        const { className = "", counter, height } = props;
        const [devName, setDevName] = useState(counter.name);
        const [renameCounterMutation] = renameElectroCounter();
        const debouncedEditHandler = useDebounce(renameCounterMutation, 2000);
        const isMobile = useMobilDeviceDetect();
        const editHandler = (name: string, devId: number) => {
            debouncedEditHandler({ id: counter.id, name });
            setDevName(name);
        };
        const mods = {
            [cls.deltaError]:
                counter.delta_error &&
                counter?.parameters &&
                counter?.parameters?.filter(
                    (el) => el.tag === "A+0" && el.value,
                ).length > 0,
        };
        return (
            <HFlexBox
                height={"15%"}
                alignItems="center"
                align="space-around"
                className={classNames(cls.counter_line, mods, [className])}
            >
                <b
                    style={{ width: isMobile ? "19%" : "13%" }}
                    className={cls.rowElement}
                >{`${counter.device_type_verbose_name}`}</b>
                <p
                    style={{ width: isMobile ? "19%" : "6%" }}
                    className={cls.rowElement}
                >{`ID:${counter.inner_id}`}</p>
                <p
                    style={{ width: isMobile ? "19%" : "13%" }}
                    className={cls.rowElement}
                >{`№${counter.device_num ?? " Н/О"}`}</p>
                <input
                    style={{ width: isMobile ? "23%" : "13%" }}
                    className={classNames(cls.rowElement, mods, [cls.inp])}
                    value={devName}
                    onChange={(e) => editHandler(e.target.value, counter.id)}
                />
                {counter.parameters?.map((parameter) => (
                    <HFlexBox
                        alignItems="center"
                        align={isMobile ? "flex-start" : "space-between"}
                        width={isMobile ? "30%" : "15.7%"}
                        gap="7px"
                        key={parameter.id}
                    >
                        <b
                            style={{ width: "15%" }}
                            className={cls.rowElement}
                        >{`${parameter.tag}:`}</b>
                        <p
                            style={{ width: "70%" }}
                            className={classNames(cls.rowElement, {}, [
                                cls.valueField,
                            ])}
                        >
                            {parameter.value
                                ? `${parameter.value}   ${parameter.dimension}`
                                : "не считано"}
                        </p>
                    </HFlexBox>
                ))}
            </HFlexBox>
        );
    },
);

ElectroCounterDetailView.displayName = "ElectroCounterDetailView";
