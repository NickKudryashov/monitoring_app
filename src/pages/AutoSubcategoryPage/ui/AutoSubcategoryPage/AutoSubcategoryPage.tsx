import { PageHeader, getSubcatGeneralInfo } from "features/PageHeader";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { EventAnswer } from "shared/types/eventTypes";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { DetailView } from "widgets/DetailView";
import cls from "./AutoSubcategoryPage.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { getAutomaticDevice } from "entities/AutomaticDevice/api/AutomaticDeviceApi";
import $api from "shared/api";
import { AutoParameterColumn, useAutoPoll } from "entities/AutomaticDevice";
import { GeneralInfoBlock } from "features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { SubcategoryTabs } from "widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { Footer } from "shared/ui/Footer/Footer";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FlexSubcategoryPageWrap } from "shared/ui/FlexBox/FlexSubcategoryPageWrap/FlexSubcategoryPageWrap";
import {
    ParamRecord,
    ParameterGroup,
} from "entities/AutomaticDevice/model/types/AutomaticDeviceTypes";
import { getAutoDeviceIdBySystem } from "entities/ObjectSubCategory";
import {
    EventCardList,
    EventLogList,
    getUserEventsByAuto,
    getUserEventsProcessingByAuto,
} from "entities/UserEvents";
import { EventEditor } from "widgets/EventEditor";
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
    const [selectedTab, setSeelctedTab] = useState(0);
    const [selectedEventGroup, setSelectedEventGroup] = useState<number>(0);
    const { data: generalData, refetch: refetchGeneral } =
        getSubcatGeneralInfo(id);
    const { data: dataID, isLoading: isLoadingDataId } =
        getAutoDeviceIdBySystem(id);
    const {
        data: devData,
        isLoading: devIsLoading,
        refetch: refetchDev,
    } = getAutomaticDevice(dataID?.device, { skip: !dataID?.device });
    const { data: events } = getUserEventsByAuto(Number(id));
    const { data: processingEvents } = getUserEventsProcessingByAuto(
        Number(id)
    );

    const poll = useAutoPoll({
        id: devData?.id,
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
    const _scrollHandler = (isScrollDown: boolean) => {
        if (!isScrollDown) {
            setSeelctedTab((prev) => (prev === 0 ? 5 : prev - 1));
        } else {
            setSeelctedTab((prev) => (prev === 5 ? 0 : prev + 1));
        }
    };
    const scrollHandler = useCallback((isScrollDown: boolean) => {
        _scrollHandler(isScrollDown);
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
                        selectedTab={selectedTab}
                        setSelectedTab={setSeelctedTab}
                        content={{
                            0: (
                                <GeneralInfoBlock
                                    device_num={devData?.device_num}
                                    device_type_verbose_name={
                                        devData?.device_type_verbose
                                    }
                                    systems={devData?.system_count}
                                    address={generalData?.adress}
                                    name={generalData?.user_object_name}
                                />
                            ),
                            1: (
                                <VFlexBox
                                    className={cls.paramTitleBox}
                                    gap={"10px"}
                                >
                                    <p
                                        onClick={() => setSelectedEventGroup(0)}
                                        className={classNames(
                                            cls.paramTitle,
                                            {
                                                [cls.paramTitleSelected]:
                                                    selectedEventGroup === 0,
                                            },
                                            []
                                        )}
                                    >
                                        СПИСОК СОБЫТИЙ
                                    </p>
                                    <p
                                        onClick={() => setSelectedEventGroup(1)}
                                        className={classNames(
                                            cls.paramTitle,
                                            {
                                                [cls.paramTitleSelected]:
                                                    selectedEventGroup === 1,
                                            },
                                            []
                                        )}
                                    >
                                        ЛОГ СОБЫТИЙ
                                    </p>
                                    <p
                                        onClick={() => setSelectedEventGroup(2)}
                                        className={classNames(
                                            cls.paramTitle,
                                            {
                                                [cls.paramTitleSelected]:
                                                    selectedEventGroup === 2,
                                            },
                                            []
                                        )}
                                    >
                                        ДОБАВИТЬ СОБЫТИЕ
                                    </p>
                                </VFlexBox>
                            ),
                            2: (
                                <VFlexBox
                                    className={cls.paramTitleBox}
                                    gap={"10px"}
                                />
                            ),
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
                                        {selectedTab === 0 &&
                                            devData &&
                                            Object.values(
                                                devData?.systemParamGroup
                                            ).map((el, i) => (
                                                <AutoParameterColumn
                                                    fullHeight
                                                    key={i}
                                                    header={`Контур ${i + 1}`}
                                                    params={el}
                                                />
                                            ))}
                                        {selectedTab === 2 &&
                                            devData &&
                                            Object.values(
                                                devData?.resultParamGroup
                                            ).map((params, i) => (
                                                <AutoParameterColumn
                                                    detail
                                                    fullHeight
                                                    key={i}
                                                    header={`Контур ${i + 1}`}
                                                    params={params}
                                                />
                                            ))}
                                        {selectedTab === 1 &&
                                            selectedEventGroup === 2 && (
                                                <EventEditor />
                                            )}
                                        {selectedTab === 1 &&
                                            selectedEventGroup === 1 && (
                                                <EventLogList
                                                    events={processingEvents}
                                                />
                                            )}
                                        {selectedTab === 1 &&
                                            selectedEventGroup === 0 && (
                                                <EventCardList
                                                    events={events}
                                                />
                                            )}
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
            {/* {devData && <AutoPoll autoPoll id={devData.id} onUpdate={refetchDev} />} */}
        </div>
    );
};

export default AutoSubcategoryPage;
