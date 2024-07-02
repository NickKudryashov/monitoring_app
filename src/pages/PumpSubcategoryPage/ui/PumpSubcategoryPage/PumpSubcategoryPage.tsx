import classNames from "shared/lib/classNames/classNames";
import cls from "./PumpSubcategoryPage.module.scss";

import { useState, type PropsWithChildren, useCallback, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailView } from "widgets/DetailView";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { Footer } from "shared/ui/Footer/Footer";
import $api from "shared/api";
import { EventAnswer } from "shared/types/eventTypes";
import { PageHeader, getSubcatGeneralInfo } from "features/PageHeader";
import { getPumpData, getPumpDataDetail, usePumpPoll } from "entities/PumpDevice";
import { GeneralInfoBlock } from "features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
import { SubcategoryTabs } from "widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FlexSubcategoryPageWrap } from "shared/ui/FlexBox/FlexSubcategoryPageWrap/FlexSubcategoryPageWrap";
import { getPumpDeviceIdBySystem } from "entities/ObjectSubCategory";
import { getUserEventsByPump, getUserEventsProcessingByPump } from "entities/UserEvents";
import { PageMapper } from "../PageMapper/PageMapper";
import { ParameterLinks } from "../ParameterLinks/ParameterLinks";
import { useAppDispatch } from "shared/hooks/hooks";
import { tabSliceActions } from "widgets/SubcategoryTabs";
import { pumpPageSliceActions } from "pages/PumpSubcategoryPage/model/slice";

interface PumpSubcategoryPageProps {
 className?: string;
}

export type ParametersDict = Record<string,PumpParameter[]>

const PumpSubcategoryPage = (props: PropsWithChildren<PumpSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
    const {data:device,isLoading:isLoadingDevices} = getPumpDeviceIdBySystem(id);
    const dispatch = useAppDispatch();
    const {data:deviceData,isLoading:isDevLoading,refetch} = getPumpData(device?.device,{pollingInterval:15000,skip:!device?.device}); 
    const {data:deviceDataDetail,isLoading:isDevDetailLoading1,refetch:refetchDetail} = getPumpDataDetail(device?.device,{pollingInterval:15000,skip:!device?.device});
    const poll = usePumpPoll({autoPoll:deviceData?.connection_info.connection_type!=="GSM",id:deviceData?.id,onUpdate:()=>{refetch();refetchGeneral();refetchDetail();}});
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);

    useEffect(()=>{
        return ()=>{
            dispatch(pumpPageSliceActions.clearParameterSubgroup());
        };
    },[]);

    const scrollHandler = useCallback((isScrollDown: boolean) => {
        if (isLoadingDevices || isDevLoading || isDevDetailLoading1) {
            return;
        }
        if (!isScrollDown) {
            dispatch(tabSliceActions.moveUp());
        } else {
            dispatch(tabSliceActions.moveDown());
        }
    }, [isLoadingDevices,isDevLoading,isDevDetailLoading1]);


    const content = (
        <DetailView className={cls.detail} onScroll={scrollHandler}>
            <FlexSubcategoryPageWrap>
                <PageHeader poll={poll} generalData={generalData}/>
                
                <HFlexBox className={cls.contentBox} gap="5px" align="space-between">
                    <SubcategoryTabs
                        content={
                            {
                                0:[<GeneralInfoBlock key={"general"} device_num={deviceData?.device_num} device_type_verbose_name={deviceData?.device_type_verbose_name} systems={0} address={generalData?.adress} name={generalData?.user_object_name} />],
                                1:[
                                    <p key={"events_1"} className={cls.paramTitle}>СПИСОК СОБЫТИЙ</p>,
                                    <p key={"events_2"} className={cls.paramTitle}>ЛОГ СОБЫТИЙ</p>,
                                    <p key={"events_3"} className={cls.paramTitle}>ДОБАВИТЬ СОБЫТИЕ</p>,
                                ],
                                2:ParameterLinks({deviceDataDetail:deviceDataDetail}) 
                            }
                        }
                    />
                    <VFlexBox width={"70%"} gap={"15px"}>
                        <VFlexBox   gap={"10px"} >
                            <VFlexBox className={cls.tableContentFlexbox}>
                                <PanelGroup
                                    direction="vertical"
                                    autoSaveId="example"
                                >
                                    <Panel defaultSize={75}>
                                        {
                                            deviceData && deviceData.parameters &&
                                            <PageMapper devData={deviceData} deviceDataDetail={deviceDataDetail} generalData={generalData}/>

                                        }
                                    </Panel>
                                    <PanelResizeHandle />
                                    <Footer pollCallback={fetchEvents}/>
                                </PanelGroup>
                            </VFlexBox>
                        </VFlexBox>
                    </VFlexBox>
                </HFlexBox>
            </FlexSubcategoryPageWrap>
        </DetailView>
    );

    return (
        <div  className={classNames(cls.PumpSubcategoryPage,{},[])}>
            {content}
        </div>
    );
};

export default PumpSubcategoryPage;
