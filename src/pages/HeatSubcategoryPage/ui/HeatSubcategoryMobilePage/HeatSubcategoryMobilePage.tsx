import classNames from "@/shared/lib/classNames/classNames";
import cls from "./HeatSubcategoryMobilePage.module.scss";

import { useCallback, type PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { DetailView } from "@/widgets/DetailView";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import {
    getHeatDeviceData,
    HeatDeviceManualPoll,
    useHeatPoll,
} from "@/entities/Heatcounters";
import { HeatParameters } from "@/entities/Heatcounters/types/type";
import { GeneralInfoBlock } from "../../../../features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { PageHeader, getSubcatGeneralInfo } from "@/features/PageHeader";
import { SubcategoryTabs } from "@/widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { getHeatDeviceIdBySystem } from "@/entities/ObjectSubCategory";
import { PageTabMapper } from "../PageMapper/PageMapper";
import { MOCK_ID, MOCK_STR_ID } from "@/shared/lib/util/constants";
import { usePoll } from "@/shared/hooks/useDevicePoll";
import { Footer } from "@/shared/ui/Footer/Footer";
import $api from "@/shared/api";
import { EventAnswer } from "@/shared/types/eventTypes";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FooterWithoutPanel } from "@/shared/ui/FooterWithoutPanel/FooterWithoutPanel";
interface HeatSubcategoryMobilePageProps {
    className?: string;
}
interface SystemParameters {
    parameters: HeatParameters[];
    systemName: string;
}
export type ParametersDict = Record<number, SystemParameters>;

const HeatSubcategoryMobilePage = (
    props: PropsWithChildren<HeatSubcategoryMobilePageProps>,
) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    const { data: generalData, refetch: refetchGeneral } = getSubcatGeneralInfo(
        id ?? MOCK_STR_ID,
    );
    const { data: device, isLoading: isLoadingDevices } =
        getHeatDeviceIdBySystem(id ?? MOCK_STR_ID, { skip: id === undefined });
    const {
        data: deviceData,
        isLoading: isDevLoading,
        refetch,
    } = getHeatDeviceData(device?.device ?? MOCK_ID, {
        pollingInterval: 15000,
        skip: device?.device === undefined,
    });
    const [poll, isBusy] = usePoll({
        autoPoll: deviceData?.connection_info.connection_type !== "GSM",
        pollDevice: HeatDeviceManualPoll.pollDevice,
        id: deviceData?.id ?? MOCK_ID,
        initialBusy: deviceData?.is_busy,
        onUpdate: () => {
            refetch();
            refetchGeneral();
        },
    });

    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>(
            "subcategory_events/" + id,
        );
        return response.data;
    }, [id]);

    const content = (
        <VFlexBox alignItems="center" className={cls.detail}>
            <PageHeader poll={poll} generalData={generalData} isBusy={isBusy} />

            {/* <VFlexBox
                className={cls.contentBox}
                gap="5px"
                align="space-between"
            > */}
            <SubcategoryTabs
                content={{
                    0: [
                        <GeneralInfoBlock
                            key={"general"}
                            device_num={deviceData?.device_num}
                            device_type_verbose_name={
                                deviceData?.device_type_verbose_name
                            }
                            systems={deviceData?.systems.length}
                            address={generalData?.adress}
                            name={generalData?.abonent}
                        />,
                    ],
                    1: [
                        <p
                            key={"events_1"}
                            className={classNames(cls.paramTitle, {}, [])}
                        >
                            СПИСОК СОБЫТИЙ
                        </p>,
                        <p
                            key={"events_2"}
                            className={classNames(cls.paramTitle, {}, [])}
                        >
                            ЛОГ СОБЫТИЙ
                        </p>,
                    ],
                    2: [
                        <p
                            key={"parameters_1"}
                            className={classNames(cls.paramTitle, {}, [])}
                        >
                            ТЕПЛОВЫЕ СХЕМЫ И ФОРМУЛЫ
                        </p>,
                        <p
                            key={"parameters_2"}
                            className={classNames(cls.paramTitle, {}, [])}
                        >
                            МГНОВЕННЫЕ ПАРАМЕТРЫ
                        </p>,
                        <p
                            key={"parameters_3"}
                            className={classNames(cls.paramTitle, {}, [])}
                        >
                            НАКОПЛЕННЫЕ ПАРАМЕТРЫ
                        </p>,
                        <p
                            key={"parameters_4"}
                            className={classNames(cls.paramTitle, {}, [])}
                        >
                            ПРЕДУСТАНОВЛЕННЫЕ ПАРАМЕТРЫ
                        </p>,
                    ],
                }}
                className={cls.subcatTabs}
            />
            {/* </VFlexBox> */}
            <PageTabMapper
                className={cls.mobileContent}
                deviceData={deviceData}
                generalData={generalData}
            />

            <FooterWithoutPanel
                className={cls.footer}
                pollCallback={fetchEvents}
            />
        </VFlexBox>
    );

    return (
        <div className={classNames(cls.HeatSubcategoryMobilePage, {}, [])}>
            {content}
        </div>
    );
};

export { HeatSubcategoryMobilePage };
