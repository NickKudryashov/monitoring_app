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
    downloadXLSFile,
    getElectroDeviceData,
    useElectroPoll,
} from "entities/ElectroDevice";
import { Loader } from "shared/ui/Loader/Loader";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FlexSubcategoryPageWrap } from "shared/ui/FlexBox/FlexSubcategoryPageWrap/FlexSubcategoryPageWrap";
import { getElectroDeviceIdBySystem } from "entities/ObjectSubCategory";
import { PageMapper } from "./PageMapper/PageMapper";
import { useAppDispatch } from "shared/hooks/hooks";
import { tabSliceActions } from "widgets/SubcategoryTabs";
import { MOCK_ID, MOCK_STR_ID } from "shared/lib/util/constants";
interface ElectroSubcategoryPageProps {
    className?: string;
}
const ElectroSubcategoryPage = (
    props: PropsWithChildren<ElectroSubcategoryPageProps>
) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {
        data: generalData,
        refetch: refetchGeneral,
        isLoading,
    } = getSubcatGeneralInfo(id ?? MOCK_STR_ID);
    const { data: elData, isLoading: idIsLoading } = getElectroDeviceIdBySystem(
        id ?? MOCK_STR_ID
    );
    const {
        data: devData,
        refetch: refetchDev,
        isLoading: devIsLoading,
    } = getElectroDeviceData(elData?.device ?? MOCK_ID, {
        skip: !elData?.device,
    });
    const poll = useElectroPoll({
        id: devData?.id ?? MOCK_ID,
        autoPoll: devData?.connection_info.connection_type !== "GSM",
        onUpdate: () => {
            refetchDev();
            refetchGeneral();
        },
    });

    const scrollHandler = useCallback((isScrollDown: boolean) => {
        if (!isScrollDown) {
            dispatch(tabSliceActions.moveUp());
        } else {
            dispatch(tabSliceActions.moveDown());
        }
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

    const content = (
        <DetailView onScroll={scrollHandler}>
            <FlexSubcategoryPageWrap>
                <PageHeader
                    poll={poll}
                    report={() => devData && downloadXLSFile(devData)}
                    generalData={generalData}
                />

                <HFlexBox
                    className={cls.contentBox}
                    gap="5px"
                    align="space-between"
                >
                    <SubcategoryTabs
                        content={{
                            0: [
                                <GeneralInfoBlock
                                    key="general"
                                    device_num={devData?.device_num}
                                    device_type_verbose_name={
                                        devData?.device_type_verbose_name
                                    }
                                    systems={devData?.systemCount}
                                    address={generalData?.adress}
                                    name={generalData?.user_object_name}
                                />,
                            ],
                            2: [
                                <p
                                    className={cls.paramTitle}
                                    key={"parameters_1"}
                                >
                                    ПАРАМЕТРЫ
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
                                        <PageMapper devData={devData} />
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
        </div>
    );
};

export default ElectroSubcategoryPage;
