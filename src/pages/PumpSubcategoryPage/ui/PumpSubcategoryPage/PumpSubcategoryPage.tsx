import classNames from "shared/lib/classNames/classNames";
import cls from "./PumpSubcategoryPage.module.scss";

import { useState, type PropsWithChildren, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { DetailView } from "widgets/DetailView";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { Footer } from "shared/ui/Footer/Footer";
import $api from "shared/api";
import { EventAnswer } from "shared/types/eventTypes";
import { PageHeader, getSubcatGeneralInfo } from "features/PageHeader";
import { DetailParameter, PumpParameterColumn, getPumpData, getPumpDataDetail, usePumpPoll } from "entities/PumpDevice";
import { GeneralInfoBlock } from "features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
import { SubcategoryTabs } from "widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { FlexSubcategoryPageWrap } from "shared/ui/FlexBox/FlexSubcategoryPageWrap/FlexSubcategoryPageWrap";
import { getPumpDeviceIdBySystem } from "entities/ObjectSubCategory";
import { EventCardList, EventLogList, getUserEventsByPump, getUserEventsProcessingByPump } from "entities/UserEvents";
import { EventEditor } from "widgets/EventEditor";

interface PumpSubcategoryPageProps {
 className?: string;
}

export type ParametersDict = Record<string,PumpParameter[]>

const PumpSubcategoryPage = (props: PropsWithChildren<PumpSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const [selectedTab,setSelectedTab] = useState(0);
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
    const {data:device,isLoading:isLoadingDevices} = getPumpDeviceIdBySystem(id);
    const [selectedEventGroup,setSelectedEventGroup] = useState<number>(0);

    const {data:deviceData,isLoading:isDevLoading,refetch} = getPumpData(device?.device,{pollingInterval:15000,skip:!device?.device}); 
    const {data:deviceDataDetail,isLoading:isDevDetailLoading1,refetch:refetchDetail} = getPumpDataDetail(device?.device,{pollingInterval:15000,skip:!device?.device});
    const { data: events } = getUserEventsByPump(Number(id));
    const { data: processingEvents } = getUserEventsProcessingByPump(Number(id));
    const poll = usePumpPoll({autoPoll:deviceData?.connection_info.connection_type!=="GSM",id:deviceData?.id,onUpdate:()=>{refetch();refetchGeneral();refetchDetail();}});
    const [selectedParamGroup,setSelectedParamGroup] = useState("");
    const [selectedParamSubGroup,setSelectedParamSubGroup] = useState("" );
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);

    if (selectedTab==2 && !selectedParamGroup && !selectedParamSubGroup) {
        setSelectedParamGroup(deviceDataDetail ? Object.keys(deviceDataDetail)[0] : "");
        setSelectedParamSubGroup(deviceDataDetail ? `ОБЩИЕ ПАРАМЕТРЫ ${Object.keys(deviceDataDetail)[0]}` : "" );
    }

    const getParams = ()=>{
        const result:ParametersDict = {};
        if (deviceData?.parameters) {
            deviceData.parameters.map((el)=>{
                const temp = result[el.parameter_verbose_group];
                temp ? 
                    result[el.parameter_verbose_group] = [...result[el.parameter_verbose_group],el] :
                    result[el.parameter_verbose_group] = [el,];
            });
            return result;
        }};
    
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

    const params = useMemo(()=>getParams(),[deviceData]);
    const content = (
        <DetailView className={cls.detail} onScroll={scrollHandler}>
            <FlexSubcategoryPageWrap>
                <PageHeader poll={poll} generalData={generalData}/>
                
                <HFlexBox className={cls.contentBox} gap="5px" align="space-between">
                    <SubcategoryTabs
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                        content={
                            {
                                0:<GeneralInfoBlock device_num={deviceData?.device_num} device_type_verbose_name={deviceData?.device_type_verbose_name} systems={0} address={generalData?.adress} name={generalData?.user_object_name} />,
                                1:<VFlexBox className={cls.paramTitleBox} gap={"10px"}>
                                    <p onClick={()=>setSelectedEventGroup(0)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedEventGroup===0},[])}>СПИСОК СОБЫТИЙ</p>
                                    <p onClick={()=>setSelectedEventGroup(1)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedEventGroup===1},[])}>ЛОГ СОБЫТИЙ</p>
                                    <p onClick={()=>setSelectedEventGroup(2)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedEventGroup===2},[])}>ДОБАВИТЬ СОБЫТИЕ</p>
                                </VFlexBox>,
                                2:<VFlexBox className={cls.paramTitleBox} gap={"10px"}>
                                    {deviceDataDetail && Object.keys(deviceDataDetail).map((grName,i)=>
                                        <VFlexBox gap="15px" height={grName===selectedParamGroup ? "40%": "5%"} alignItems="center" key={i}>
                                            <p key={i} onClick={()=>{setSelectedParamGroup(grName);setSelectedParamSubGroup("");}} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===grName},[])}>{grName}</p>
                                            {grName===selectedParamGroup && 
                                            <VFlexBox className={cls.paramSelectors}>
                                                <p key={i} onClick={()=>setSelectedParamSubGroup(`ОБЩИЕ ПАРАМЕТРЫ ${grName}`)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===grName},[])}>{`ОБЩИЕ ПАРАМЕТРЫ ${grName}`}</p>
                                                <p key={i} onClick={()=>setSelectedParamSubGroup(`НЕИСПРАВНОСТИ ${grName}`)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===grName},[])}>{`НЕИСПРАВНОСТИ ${grName}`}</p>
                                                <VFlexBox alignItems="center" align="space-around" className={cls.previewBox}>
                                                    {
                                                        deviceDataDetail[grName].preview.map((el)=>
                                                            <HFlexBox align="space-around" alignItems="center" height="20%" className={cls.preview}  key={el.id}>
                                                                <p className={cls.previewName}>{el.verbose_name}</p>
                                                                <p className={cls.previewVal}>{el.value}</p>
                                                            </HFlexBox>
                                                        )
                                                    }
                                                </VFlexBox>
                                            </VFlexBox>
                                            }
                                        </VFlexBox>
                                    )}
                                </VFlexBox>
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
                                            <HFlexBox  className={classNames(cls.paramGroups,{},[className,])} align="center" alignItems="start">
                                                {selectedTab===0 && Object.keys(params)?.map((grName,i)=>
                                                    <PumpParameterColumn key={i} params={params[grName]} header={grName}  />
                            
                                                )}
                                                {selectedTab===2 && deviceDataDetail && selectedParamSubGroup.includes("НЕИСПР") &&
                                                <DetailParameter errors={deviceDataDetail[selectedParamGroup]?.errors}  header={selectedParamSubGroup}  />
                            
                                                }
                                                {selectedTab===2 && deviceDataDetail && selectedParamSubGroup.includes("ОБЩ") &&
                                                <DetailParameter  params={deviceDataDetail[selectedParamGroup]?.general} header={selectedParamSubGroup}  />
                            
                                                }
                                                {selectedTab===1 && selectedEventGroup===2 && <EventEditor/>}
                                                {selectedTab===1 && selectedEventGroup===1 && <EventLogList events={processingEvents} />}
                                                {selectedTab===1 && selectedEventGroup===0 && <EventCardList events={events} /> }
                                            </HFlexBox>

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
