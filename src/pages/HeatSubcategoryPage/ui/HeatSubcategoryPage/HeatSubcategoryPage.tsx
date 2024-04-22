import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatSubcategoryPage.module.scss";

import { useState, type PropsWithChildren, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { DetailView } from "widgets/DetailView";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { Footer } from "shared/ui/Footer/Footer";
import { getArchives, getConfigParams, getHeatDevs } from "../../api/api";
import { getHeatDeviceData, useHeatPoll } from "entities/Heatcounters";
import { HeatParameters } from "entities/Heatcounters/types/type";
import $api from "shared/api";
import { EventAnswer } from "shared/types/eventTypes";
import { GeneralInfoBlock } from "../../../../features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { ParameterView } from "../ParameterView/ParameterView";
import { ArchiveView } from "../ArchiveView/ArchiveView/ArchiveView";
import { PageHeader, getSubcatGeneralInfo } from "features/PageHeader";
import { SystemsInfoBLock } from "../SystemsInfoBlock/SystemsInfoBlock";
import { ConfigParameterColumn } from "../ConfigParameterColumn/ConfigParameterColumn";
import { SubcategoryTabs } from "widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { PollBlock } from "../ArchiveView/PollBlock/PollBlock";
import { CreateReportBlock } from "../ArchiveView/CreateReportBlock/CreateReportBlock";
import { SubHeader } from "features/PageHeader/SubHeader/SubHeader";
import { SimpleReport } from "../ArchiveView/SimpleReport/SimpleReport";
import { ReportSettings } from "../ArchiveView/ReportSettings/ReportSettings";
import { ReportFilesView } from "../ArchiveView/ReportFilesView/ReportFilesView";
interface HeatSubcategoryPageProps {
 className?: string;
}
interface SystemParameters {
    parameters:HeatParameters[];
    systemName:string;
} 
export type ParametersDict = Record<number,SystemParameters>

interface GroupClickProps {
    parameters?:number;
    archive?:number;
}
const MOCK_TS = [1,2,3,4];
const MOCK_PARAM = [1,2,3];
const MOCK_PARAM_VAL = [1,2,3,4,5,6,7,8,9,10,11];
const HeatSubcategoryPage = (props: PropsWithChildren<HeatSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const [selectedSystem,setSeelctedSystem] = useState(0);
    const [selectedTab,setSeelctedTab] = useState(0);
    const [selectedParamGroup,setSelectedParamGroup] = useState(undefined);
    const [selectedArchiveGroup,setSelectedArchiveGroup] = useState(undefined);
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
    const {data:archData,isLoading:archLoading} = getArchives(id);
    const {data:device,isLoading:isLoadingDevices} = getHeatDevs(id);
    const {data:deviceData,isLoading:isDevLoading,refetch} = getHeatDeviceData(device?.length ? String(device[0]) : undefined,{pollingInterval:15000});
    const {data:configParameters} = getConfigParams(String(deviceData?.systems[selectedSystem]?.id));
    const poll = useHeatPoll({autoPoll:deviceData?.connection_info.connection_type!=="GSM",id:deviceData?.id,onUpdate:()=>{refetch();refetchGeneral();}});
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);
    const filterInstant = (params:HeatParameters[])=>params?.filter((el)=>el.parameter_type==="instant_parameter");
    const filterAccumulate = (params:HeatParameters[])=>params?.filter((el)=>el.parameter_type==="accumulate_parameter");
    const allParams = (params:HeatParameters[])=>params?.filter((el)=>!el.exclude && el.parameter_type==="instant_parameter");
    const getParams = (filt:(params:HeatParameters[])=>HeatParameters[])=>{
        const result:ParametersDict = {};
        if (deviceData?.systems) {
            deviceData.systems.map((el)=>{
                const temp = filt(el.parameters) ?? [];
                result[el.id] = {systemName:el.name,parameters:temp};
            });
            return result;
        }};
    
    const onParamGroupClick = ({archive,parameters}:GroupClickProps)=>{
        setSelectedParamGroup(parameters);
        setSelectedArchiveGroup(archive);
    };


    const params:ParametersDict = useMemo(()=>getParams(allParams),[deviceData]);
    const instantParams:ParametersDict = useMemo(()=>getParams(filterInstant),[deviceData]);
    const accumulateParams:ParametersDict = useMemo(()=>getParams(filterAccumulate),[deviceData]);

    const content = (
        <DetailView className={cls.detail}>
            <VFlexBox  width="90%">
                <PageHeader poll={poll} generalData={generalData}/>
                
                <HFlexBox className={cls.contentBox} gap="5px" align="space-between">
                    <SubcategoryTabs
                        selectedTab={selectedTab}
                        setSelectedTab={setSeelctedTab}
                        content={
                            {0:<GeneralInfoBlock device_num={deviceData?.device_num} device_type_verbose_name={deviceData?.device_type_verbose_name} systems={deviceData?.systems.length} address={generalData?.adress} name={generalData?.abonent} />,
                                2:<VFlexBox className={cls.paramTitleBox} gap={"10px"}>
                                    <p onClick={()=>onParamGroupClick({parameters:0})} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===0},[])}>ТЕПЛОВЫЕ СХЕМЫ И ФОРМУЛЫ</p>
                                    <p onClick={()=>onParamGroupClick({parameters:1})} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===1},[])}>МГНОВЕННЫЕ ПАРАМЕТРЫ</p>
                                    <p onClick={()=>onParamGroupClick({parameters:2})} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===2},[])}>НАКОПЛЕННЫЕ ПАРАМЕТРЫ</p>
                                    <p onClick={()=>onParamGroupClick({parameters:3})} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===3},[])}>ПРЕДУСТАНОВЛЕННЫЕ ПАРАМЕТРЫ</p>
                                </VFlexBox>,
                                3:<VFlexBox className={cls.paramTitleBox} gap={"10px"}>
                                    <p onClick={()=>onParamGroupClick({archive:0})} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedArchiveGroup===0},[])}>СНЯТЬ АРХИВ</p>
                                    <p onClick={()=>onParamGroupClick({archive:1})} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedArchiveGroup===1},[])}>СФОРМИРОВАТЬ АРХИВ</p>
                                    <p onClick={()=>onParamGroupClick({archive:2})} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedArchiveGroup===2},[])}>НАСТРОЙКА ФОРМИРОВАНИЯ АРХИВА</p>
                                    <p onClick={()=>onParamGroupClick({archive:3})} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedArchiveGroup===3},[])}>СКАЧАТЬ СФОРМИРОВАННЫЙ АРХИВ</p>
                                </VFlexBox>
                            }}  
                    />
                    <VFlexBox width={"70%"} gap={"15px"}>
                        <VFlexBox   gap={"5px"} >
                            <VFlexBox className={cls.tableContentFlexbox}>
                                <PanelGroup
                                    direction="vertical"
                                    autoSaveId="example"
                                >
                                    {/* <SubcatTabs selectedTab={selectedTab} onTabSelect={setSeelctedTab} /> */}
                                    {/* <ParameterView className={cls.contentPaddings} configParameters={configParameters} params={params}/> */}
                                    <Panel defaultSize={75}>
                                        {selectedTab===3 && <SubHeader generalData={generalData} />}
                                        {selectedTab===3 && selectedArchiveGroup==0 && <PollBlock deviceData={deviceData}/>}
                                        {selectedTab===3 && (selectedArchiveGroup==1 || selectedArchiveGroup==undefined) && <SimpleReport deviceData={deviceData}/>}
                                        {selectedTab===3 && selectedArchiveGroup==2 && !archLoading && !isDevLoading  &&  <ReportSettings archData={archData} generalData={generalData} deviceData={deviceData}/>}
                                        {selectedTab===3 && selectedArchiveGroup==3 && !archLoading && !isDevLoading  &&  <ReportFilesView archData={archData} generalData={generalData} deviceData={deviceData}/>}
                                        {selectedTab===0 && 
                                        <ParameterView  params={params}/>
                                        }

                                        {selectedTab===1 && <ParameterView  params={params}/>}
                                        {selectedTab===2 && selectedParamGroup===0 && <SystemsInfoBLock systems={deviceData?.systems} />}
                                        {selectedTab===2 && selectedParamGroup===1 && <ParameterView  params={instantParams}  />}
                                        {selectedTab===2 && selectedParamGroup===2 && <ParameterView  params={accumulateParams}  />}
                                        {selectedTab===2 && selectedParamGroup===3 && <ConfigParameterColumn  configParameters={configParameters}  />}
                                        {selectedTab===5 && <ParameterView  params={params}/>}
                                        {selectedTab===4 && <ParameterView  params={params}/>}
                                    </Panel>
                                    <PanelResizeHandle />
                                    <Footer pollCallback={fetchEvents}/>
                                </PanelGroup>

                            </VFlexBox>
                            {/* {deviceData && deviceData.connection_info.connection_type!=="GSM" && <HeatPoll autoPoll={true} id={deviceData.id} onUpdate={()=>{refetch();refetchGeneral();}} />} */}
                        </VFlexBox>
                    </VFlexBox>
                </HFlexBox>
            </VFlexBox>
        </DetailView>
    );

    return (
        <div  className={classNames(cls.HeatSubcategoryPage,{},[])}>
            {content}
        </div>
    );
};

export default HeatSubcategoryPage;
