import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatSubcategoryPage.module.scss";

import { type PropsWithChildren, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DetailView } from "widgets/DetailView";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { Footer } from "shared/ui/Footer/Footer";
import { getHeatDeviceData, useHeatPoll } from "entities/Heatcounters";
import { HeatParameters } from "entities/Heatcounters/types/type";
import $api from "shared/api";
import { EventAnswer } from "shared/types/eventTypes";
import { GeneralInfoBlock } from "../../../../features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { PageHeader, getSubcatGeneralInfo } from "features/PageHeader";
import { SubcategoryTabs } from "widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FlexSubcategoryPageWrap } from "shared/ui/FlexBox/FlexSubcategoryPageWrap/FlexSubcategoryPageWrap";
import { tabSliceActions } from "widgets/SubcategoryTabs";
import { getHeatDeviceIdBySystem } from "entities/ObjectSubCategory";
import { PageTabMapper } from "../PageMapper/PageMapper";
import { useAppDispatch } from "shared/hooks/hooks";
import { MOCK_ID, MOCK_STR_ID } from "shared/lib/util/constants";
interface HeatSubcategoryPageProps {
 className?: string;
}
interface SystemParameters {
    parameters:HeatParameters[];
    systemName:string;
} 
export type ParametersDict = Record<number,SystemParameters>



const HeatSubcategoryPage = (props: PropsWithChildren<HeatSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();

    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id ?? MOCK_STR_ID);
    const {data:device,isLoading:isLoadingDevices} = getHeatDeviceIdBySystem(id ?? MOCK_STR_ID,{skip:id===undefined});
    const {data:deviceData,isLoading:isDevLoading,refetch} = getHeatDeviceData(device?.device ?? MOCK_ID,{pollingInterval:15000,skip:device?.device===undefined});
    const poll = useHeatPoll({autoPoll:deviceData?.connection_info.connection_type!=="GSM",id:deviceData?.id ?? MOCK_ID,onUpdate:()=>{refetch();refetchGeneral();}});
    const dispatch = useAppDispatch();
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);
    
    const scrollHandler = useCallback((isScrollDown:boolean)=>{
        if (!isScrollDown) {
            dispatch(tabSliceActions.moveUp());
        }         
        else {
            dispatch(tabSliceActions.moveDown());

        }     
    },[]);

    const content = (
        <DetailView onScroll={scrollHandler} className={cls.detail} >
            <FlexSubcategoryPageWrap>
                <PageHeader poll={poll} generalData={generalData}/>
                
                <HFlexBox className={cls.contentBox} gap="5px" align="space-between">
                    <SubcategoryTabs
                        content={
                            {0:[<GeneralInfoBlock key={"general"} device_num={deviceData?.device_num} device_type_verbose_name={deviceData?.device_type_verbose_name} systems={deviceData?.systems.length} address={generalData?.adress} name={generalData?.abonent} />],
                                1:[
                                    <p key={"events_1"} className={classNames(cls.paramTitle,{},[])}>СПИСОК СОБЫТИЙ</p>,
                                    <p key={"events_2"} className={classNames(cls.paramTitle,{},[])}>ЛОГ СОБЫТИЙ</p>,
                                    <p key={"events_3"} className={classNames(cls.paramTitle,{},[])}>ДОБАВИТЬ СОБЫТИЕ</p>,
                                ],
                                2:[
                                    <p key={"parameters_1"} className={classNames(cls.paramTitle,{},[])}>ТЕПЛОВЫЕ СХЕМЫ И ФОРМУЛЫ</p>,
                                    <p key={"parameters_2"} className={classNames(cls.paramTitle,{},[])}>МГНОВЕННЫЕ ПАРАМЕТРЫ</p>,
                                    <p key={"parameters_3"} className={classNames(cls.paramTitle,{},[])}>НАКОПЛЕННЫЕ ПАРАМЕТРЫ</p>,
                                    <p key={"parameters_4"} className={classNames(cls.paramTitle,{},[])}>ПРЕДУСТАНОВЛЕННЫЕ ПАРАМЕТРЫ</p>,
                                ],
                                3:[
                                    <p key={"archives_1"} className={classNames(cls.paramTitle,{},[])}>СНЯТЬ АРХИВ</p>,
                                    <p key={"archives_2"} className={classNames(cls.paramTitle,{},[])}>СФОРМИРОВАТЬ АРХИВ</p>,
                                    <p key={"archives_3"} className={classNames(cls.paramTitle,{},[])}>НАСТРОЙКА ФОРМИРОВАНИЯ АРХИВА</p>,
                                    <p key={"archives_4"} className={classNames(cls.paramTitle,{},[])}>СКАЧАТЬ СФОРМИРОВАННЫЙ АРХИВ</p>,
                                ],
                                4:[
                                    <p key={"graph_1"} className={classNames(cls.paramTitle,{},[])}>СФОРМИРОВАТЬ ГРАФИК</p>,
                                ]
                            }}  
                    />
                    <VFlexBox width={"70%"} gap={"15px"}>
                        <VFlexBox   gap={"5px"} >
                            <VFlexBox className={cls.tableContentFlexbox}>
                                <PanelGroup
                                    direction="vertical"
                                    autoSaveId="example"
                                >
                                    <Panel defaultSize={75}>
                                        <PageTabMapper deviceData={deviceData} generalData={generalData}  />
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
        <div  className={classNames(cls.HeatSubcategoryPage,{},[])}>
            {content}
        </div>
    );
};

export default HeatSubcategoryPage;
