import { PageHeader, getSubcatGeneralInfo } from "features/PageHeader";
import { PropsWithChildren, useCallback } from "react";
import { useParams } from "react-router-dom";
import { EventAnswer } from "shared/types/eventTypes";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { DetailView } from "widgets/DetailView";
import cls from "./AutoSubcategoryPage.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { getAutomaticDevice } from "entities/AutomaticDevice/api/AutomaticDeviceApi";
import $api from "shared/api";
import { useAutoPoll } from "entities/AutomaticDevice";
import { GeneralInfoBlock } from "features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { SubcategoryTabs } from "widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { Footer } from "shared/ui/Footer/Footer";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FlexSubcategoryPageWrap } from "shared/ui/FlexBox/FlexSubcategoryPageWrap/FlexSubcategoryPageWrap";
import { ParameterGroup } from "entities/AutomaticDevice/model/types/AutomaticDeviceTypes";
import { getAutoDeviceIdBySystem } from "entities/ObjectSubCategory";
import { PageMapper } from "../PageMapper/PageMapper";
import { useAppDispatch } from "shared/hooks/hooks";
import { tabSliceActions } from "widgets/SubcategoryTabs";
import { MOCK_ID, MOCK_STR_ID } from "shared/lib/util/constants";
interface AutoSubcategoryPageProps {
    className?: string;
}

interface AutoParamsDict {
    [key: string]: ParameterGroup[];
}
const AutoSubcategoryPage = (
    props: PropsWithChildren<AutoSubcategoryPageProps>
) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const { data: generalData, refetch: refetchGeneral } = getSubcatGeneralInfo(
        id ?? MOCK_STR_ID
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

    const poll = useAutoPoll({
        id: devData?.id ?? MOCK_ID,
        onUpdate: refetchDev,
        autoPoll: devData?.connection_info?.connection_type !== "GSM",
    });
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>(
            "subcategory_events/" + id
        );
        return response.data;
    }, [id]);

    const systemsCard = [];
    if (devData) {
        for (let i = 0; i < devData.system_count; i++) {
            systemsCard.push(i + 1);
        }
    }
    const scrollHandler = useCallback((isScrollDown: boolean) => {
        if (!isScrollDown) {
            dispatch(tabSliceActions.moveUp());
        } else {
            dispatch(tabSliceActions.moveDown());
        }
    }, []);

    const content = (
        <DetailView onScroll={scrollHandler}>
            <FlexSubcategoryPageWrap>
                <PageHeader poll={poll} generalData={generalData} />

                <HFlexBox
                    className={cls.contentBox}
                    gap="5px"
                    align="space-between"
                >
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
                                <p
                                    className={cls.paramTitle}
                                    key={"parameters_1"}
                                >
                                    ПАРАМЕТРЫ
                                </p>,
                            ],
                            4: [
                                <p
                                    key={"graph_1"}
                                    className={classNames(
                                        cls.paramTitle,
                                        {},
                                        []
                                    )}
                                >
                                    СФОРМИРОВАТЬ ГРАФИК
                                </p>,
                            ],
                        }}
                    />
                    <VFlexBox width={"70%"} gap={"15px"}>
                        <VFlexBox gap={"10px"}>
                            <PanelGroup
                                direction="vertical"
                                autoSaveId="example"
                            >
                                <Panel defaultSize={75}>
                                    <HFlexBox
                                        gap="30px"
                                        className={cls.tableContentFlexbox}
                                    >
                                        <PageMapper
                                            devData={devData}
                                            generalData={generalData}
                                        />
                                    </HFlexBox>
                                </Panel>
                                <PanelResizeHandle />
                                <Footer pollCallback={fetchEvents} />
                            </PanelGroup>
                        </VFlexBox>
                    </VFlexBox>
                </HFlexBox>
            </FlexSubcategoryPageWrap>
        </DetailView>
    );

    return (
        <div className={classNames(cls.AutoSubcategoryPage, {}, [])}>
            {content}
        </div>
    );
};

export default AutoSubcategoryPage;
