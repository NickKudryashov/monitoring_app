import { PageHeader, getSubcatGeneralInfo } from "features/PageHeader";
import { PropsWithChildren, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { EventAnswer } from "shared/types/eventTypes";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { DetailView } from "widgets/DetailView";
import cls from "./ElectroSubcategoryPage.module.scss";
import classNames from "shared/lib/classNames/classNames";
import $api, { API_URL } from "shared/api";
import { GeneralInfoBlock } from "features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { SubcategoryTabs } from "widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { Footer } from "shared/ui/Footer/Footer";
import {
    ElectroCounterDeviceDetail,
    ElectroStatistic,
    TopLevelElectroDevice,
    getElectroDeviceData,
    useElectroPoll,
} from "entities/ElectroDevice";
import { Loader } from "shared/ui/Loader/Loader";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FlexSubcategoryPageWrap } from "shared/ui/FlexBox/FlexSubcategoryPageWrap/FlexSubcategoryPageWrap";
import { getElectroDeviceIdBySystem } from "entities/ObjectSubCategory";
interface ElectroSubcategoryPageProps {
    className?: string;
}
const ElectroSubcategoryPage = (
    props: PropsWithChildren<ElectroSubcategoryPageProps>
) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const [selectedTab, setSelectedTab] = useState(0);
    const {
        data: generalData,
        refetch: refetchGeneral,
        isLoading,
    } = getSubcatGeneralInfo(id);
    const { data: elData, isLoading: idIsLoading } =
        getElectroDeviceIdBySystem(id);
    const {
        data: devData,
        refetch: refetchDev,
        isLoading: devIsLoading,
    } = getElectroDeviceData(elData?.device, { skip: !elData?.device });
    const poll = useElectroPoll({
        id: devData?.id,
        autoPoll: devData?.connection_info.connection_type !== "GSM",
        onUpdate: () => {
            refetchDev();
            refetchGeneral();
        },
    });
    const _scrollHandler = (isScrollDown: boolean) => {
        if (!isScrollDown) {
            setSelectedTab((prev) => (prev === 0 ? 5 : prev - 1));
        } else {
            setSelectedTab((prev) => (prev === 5 ? 0 : prev + 1));
        }
    };

    const scrollHandler = useCallback((isScrollDown: boolean) => {
        _scrollHandler(isScrollDown);
    }, []);
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>(
            "subcategory_events/" + id
        );
        return response.data;
    }, [id]);

    if (devIsLoading || isLoading || idIsLoading) {
        return <Loader />;
    }

    const downloadXLSFile = async (dev: TopLevelElectroDevice) => {
        const response = $api.post(`electro_report/${dev.id}`);
        fetch(`${API_URL}electro_report/${dev.id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            response.blob().then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                // console.log(url);
                a.href = url;
                a.download = `${dev.name}_${dev.device_type_verbose_name}_отчет.xlsx`;
                a.click();
                a.remove();
            });
        });
    };

    const content = (
        <DetailView onScroll={scrollHandler}>
            <FlexSubcategoryPageWrap>
                <PageHeader
                    poll={poll}
                    report={() => downloadXLSFile(devData)}
                    generalData={generalData}
                />

                <HFlexBox
                    className={cls.contentBox}
                    gap="5px"
                    align="space-between"
                >
                    <SubcategoryTabs
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                        content={{
                            0: (
                                <GeneralInfoBlock
                                    device_num={devData?.device_num}
                                    device_type_verbose_name={
                                        devData?.device_type_verbose_name
                                    }
                                    systems={
                                        devData
                                            ? Object.keys(devData?.statistic)
                                                  .length
                                            : 0
                                    }
                                    address={generalData?.adress}
                                    name={generalData?.user_object_name}
                                />
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
                                        {selectedTab === 0 && devData && (
                                            <VFlexBox align="space-around">
                                                <ElectroStatistic
                                                    className={cls.statistic}
                                                    autoPollMode={
                                                        devData.autopoll
                                                    }
                                                    id={devData.id}
                                                    last_poll_seconds={
                                                        devData.last_poll_seconds
                                                    }
                                                    last_update={
                                                        devData.last_update
                                                    }
                                                    pollInterval={
                                                        devData.interval
                                                    }
                                                />
                                                <ElectroCounterDeviceDetail
                                                    stat={devData?.statistic}
                                                    className={cls.counters}
                                                    devname={devData?.name}
                                                    dev_id={String(devData?.id)}
                                                />
                                            </VFlexBox>
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
        <div className={classNames(cls.ElectroSubcategoryPage, {}, [])}>
            {content}
            {/* {devData && <AutoPoll autoPoll id={devData.id} onUpdate={refetchDev} />} */}
        </div>
    );
};

export default ElectroSubcategoryPage;
