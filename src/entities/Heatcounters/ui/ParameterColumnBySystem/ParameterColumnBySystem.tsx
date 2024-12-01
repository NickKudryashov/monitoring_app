import {
    ChangeEvent,
    ReactElement,
    useCallback,
    useMemo,
    useState,
} from "react";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterColumnBySystem.module.scss";
import { HeatParameterRow } from "../HeatParameterRow/HeatParameterRow";
import { HeatParameters } from "../../types/type";
import classNames from "@/shared/lib/classNames/classNames";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
import { AppInput, InputThemes } from "@/shared/ui/AppInput/AppInput";
import { editHeatSystemName } from "../../api/heatcountersapi";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
interface ParameterColumnBySystemProps {
    params: HeatParameters[];
    id?: number;
    header: string;
    onParameterClick?: (parameter: HeatParameters) => void;
    onParameterUnClick?: (parameter: HeatParameters) => void;
    selectedParametersIDs?: number[];
}

export function ParameterColumnBySystem(
    props: ParameterColumnBySystemProps,
): ReactElement {
    const {
        header,
        params,
        onParameterClick,
        onParameterUnClick,
        selectedParametersIDs,
        id,
    } = props;
    const isMobile = useMobilDeviceDetect();
    const [rename] = editHeatSystemName();
    const [sysName, setSysName] = useState(header);
    const preSelected = useCallback(
        (id: number) => {
            return selectedParametersIDs?.includes(id);
        },
        [selectedParametersIDs],
    );
    const renameSystem = (e: ChangeEvent<HTMLInputElement>) => {
        setSysName(e.target.value);
        if (id) {
            rename({ name: e.target.value, system_id: id });
        }
    };
    return (
        <VFlexBox
            width={isMobile ? "90%" : "45%"}
            height={isMobile ? "auto" : "45%"}
            alignItems="center"
            className={cls.paramFlexBox}
        >
            {/* <div className={cls.paramBoxHeader}> */}
            <HFlexBox
                height="20%"
                gap="5px"
                className={classNames(cls.sysHeader, {}, [cls.paramBoxHeader])}
            >
                <p
                // className={classNames(cls.sysHeader, {}, [
                //     cls.paramBoxHeader,
                // ])}
                >{`ПАРАМЕТРЫ КОНТУРА`}</p>
                <AppInput
                    theme={InputThemes.CLEAR}
                    value={sysName}
                    onChange={renameSystem}
                    className={cls.sysNameInp}
                />
            </HFlexBox>
            {/* </div> */}
            <VFlexBox
                className={cls.rows}
                height="80%"
                gap="5px"
                align="space-around"
            >
                {params?.map((elem) => (
                    <HeatParameterRow
                        key={elem.id}
                        elem={elem}
                        onParameterClick={onParameterClick}
                        onParameterUnClick={onParameterUnClick}
                        preSelected={preSelected(elem.id)}
                    />
                ))}
            </VFlexBox>
        </VFlexBox>
    );
}
