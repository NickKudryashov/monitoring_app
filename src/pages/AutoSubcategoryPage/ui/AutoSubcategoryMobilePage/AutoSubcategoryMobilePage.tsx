import { PageHeader, getSubcatGeneralInfo } from "@/features/PageHeader";
import { PropsWithChildren, useCallback } from "react";
import { useParams } from "react-router-dom";
import { EventAnswer } from "@/shared/types/eventTypes";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./AutoSubcategoryMobilePage.module.scss";
import classNames from "@/shared/lib/classNames/classNames";
import { getAutomaticDevice } from "@/entities/AutomaticDevice/api/AutomaticDeviceApi";
import $api from "@/shared/api";
import { AutoDevicePoll, useAutoPoll } from "@/entities/AutomaticDevice";
import { GeneralInfoBlock } from "@/features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { SubcategoryTabs } from "@/widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { getAutoDeviceIdBySystem } from "@/entities/ObjectSubCategory";
import { PageMapper } from "../PageMapper/PageMapper";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { MOCK_ID, MOCK_STR_ID } from "@/shared/lib/util/constants";
import { usePoll } from "@/shared/hooks/useDevicePoll";
import { FooterWithoutPanel } from "@/shared/ui/FooterWithoutPanel/FooterWithoutPanel";
interface AutoSubcategoryMobilePageProps {
    className?: string;
}

const AutoSubcategoryMobilePage = (
    props: PropsWithChildren<AutoSubcategoryMobilePageProps>,
) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const { data: generalData, refetch: refetchGeneral } = getSubcatGeneralInfo(
        id ?? MOCK_STR_ID,
    );
    const { data: dataID, isLoading: isLoadingDataId } =
        getAutoDeviceIdBySystem(id ?? MOCK_STR_ID);
    const {
        data: devData,
        isLoading: devIsLoading,
        refetch: refetchDev,
    } = getAutomaticDevice(dataID?.device ?? MOCK_ID, {
        skip: !dataID?.device,
    });
    const dispatch = useAppDispatch();

    const [poll, isBusy] = usePoll({
        id: devData?.id ?? MOCK_ID,
        pollDevice: AutoDevicePoll.pollDevice,
        initialBusy: devData?.is_busy,
        onUpdate: () => {
            refetchDev();
            refetchGeneral();
        },
        autoPoll: devData?.connection_info?.connection_type !== "GSM",
    });
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>(
            "subcategory_events/" + id,
        );
        return response.data;
    }, [id]);

    const systemsCard = [];
    if (devData) {
        for (let i = 0; i < devData.system_count; i++) {
            systemsCard.push(i + 1);
        }
    }

    const content = (
        <VFlexBox alignItems="center" className={cls.detail}>
            <PageHeader poll={poll} generalData={generalData} isBusy={isBusy} />

            <SubcategoryTabs
                content={{
                    0: [
                        <GeneralInfoBlock
                            key={"general"}
                            device_num={devData?.device_num}
                            device_type_verbose_name={
                                devData?.device_type_verbose
                            }
                            systems={devData?.system_count}
                            address={generalData?.adress}
                            name={generalData?.user_object_name}
                        />,
                    ],
                    1: [
                        <p className={cls.paramTitle} key={"events_1"}>
                            СПИСОК СОБЫТИЙ
                        </p>,
                        <p className={cls.paramTitle} key={"events_2"}>
                            ЛОГ СОБЫТИЙ
                        </p>,
                        <p className={cls.paramTitle} key={"events_3"}>
                            ДОБАВИТЬ СОБЫТИЕ
                        </p>,
                    ],
                    2: [
                        <p className={cls.paramTitle} key={"parameters_1"}>
                            ПАРАМЕТРЫ
                        </p>,
                    ],
                }}
            />

            <PageMapper devData={devData} generalData={generalData} />
            <FooterWithoutPanel
                className={cls.footer}
                pollCallback={fetchEvents}
            />
        </VFlexBox>
    );

    return (
        <div className={classNames(cls.AutoSubcategoryMobilePage, {}, [])}>
            {content}
        </div>
    );
};

export default AutoSubcategoryMobilePage;
