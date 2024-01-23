import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatSubcategoryPage.module.scss";

import { useState, type PropsWithChildren, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { DetailView } from "widgets/DetailView";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { Footer } from "shared/ui/Footer/Footer";
import { getConfigParams, getHeatDevs } from "../../api/api";
import { HeatPoll, getHeatDeviceData, useHeatPoll } from "entities/Heatcounters";
import { HeatParameters } from "entities/Heatcounters/types/type";
import $api from "shared/api";
import { EventAnswer } from "shared/types/eventTypes";
import { GeneralInfoBlock } from "../GeneralInfoBlock/GeneralInfoBlock";
import { SystemCard } from "../SystemCard/SystemCard";
import { ParameterView } from "../ParameterView/ParameterView";
import { ArchiveView } from "../ArchiveView/ArchiveView/ArchiveView";
import { SubcatTabs } from "features/SubcatTabs";
import { PageHeader, getSubcatGeneralInfo } from "features/PageHeader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { SystemsInfoBLock } from "../SystemsInfoBlock/SystemsInfoBlock";
import { ParameterColumn } from "../ParameterColumn/ParameterColumn";
import { ConfigParameterColumn } from "../ConfigParameterColumn/ConfigParameterColumn";

interface HeatSubcategoryPageProps {
 className?: string;
}
interface SystemParameters {
    parameters:HeatParameters[];
    systemName:string;
} 
export type ParametersDict = Record<number,SystemParameters>

const MOCK_TS = [1,2,3,4];
const MOCK_PARAM = [1,2,3];
const MOCK_PARAM_VAL = [1,2,3,4,5,6,7,8,9,10,11];
const HeatSubcategoryPage = (props: PropsWithChildren<HeatSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const [selectedSystem,setSeelctedSystem] = useState(0);
    const [selectedTab,setSeelctedTab] = useState(0);
    const [selectedParamGroup,setSelectedParamGroup] = useState(undefined);
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
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
    const allParams = (params:HeatParameters[])=>params;
    const getParams = (filt:(params:HeatParameters[])=>HeatParameters[])=>{
        const result:ParametersDict = {};
        if (deviceData?.systems) {
            deviceData.systems.map((el)=>{
                const temp = filt(el.parameters) ?? [];
                result[el.id] = {systemName:el.name,parameters:temp};
            });
            return result;
        }};

    const params:ParametersDict = useMemo(()=>getParams(allParams),[deviceData]);
    const instantParams:ParametersDict = useMemo(()=>getParams(filterInstant),[deviceData]);
    const accumulateParams:ParametersDict = useMemo(()=>getParams(filterAccumulate),[deviceData]);

    const content = (
        <DetailView className={cls.detail}>
            <VFlexBox>
                <PageHeader poll={poll} generalData={generalData}/>
                
                <HFlexBox className={cls.contentBox} gap="5px" align="space-around">
                    <VFlexBox align="flex-start" alignItems="center" width="23%">
                        <AppButon 
                            className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===0},[])} width={"100%"}
                            onClick={()=>setSeelctedTab(0)}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>ОБОБЩЕННАЯ ИНФОРМАЦИЯ</AppButon>
                        {selectedTab===0 && <GeneralInfoBlock deviceData={deviceData} address={generalData?.adress} name={generalData?.user_object_name} />}
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===1},[])} width={"100%"}  onClick={()=>setSeelctedTab(1)}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>СОБЫТИЯ</AppButon>
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===2},[])} width={"100%"}  onClick={()=>{setSeelctedTab(2);setSelectedParamGroup(0);}}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>ПАРАМЕТРЫ</AppButon>
                        {selectedTab===2 && 
                        <VFlexBox className={cls.paramTitleBox} gap={"10px"}>
                            <p onClick={()=>setSelectedParamGroup(0)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===0},[])}>ТЕПЛОВЫЕ СХЕМЫ И ФОРМУЛЫ</p>
                            <p onClick={()=>setSelectedParamGroup(1)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===1},[])}>МГНОВЕННЫЕ ПАРАМЕТРЫ</p>
                            <p onClick={()=>setSelectedParamGroup(2)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===2},[])}>НАКОПЛЕННЫЕ ПАРАМЕТРЫ</p>
                            <p onClick={()=>setSelectedParamGroup(3)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===3},[])}>ПРЕДУСТАНОВЛЕННЫЕ ПАРАМЕТРЫ</p>
                        </VFlexBox>
                        }
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===3},[])} width={"100%"}  onClick={()=>setSeelctedTab(3)}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>АРХИВЫ</AppButon>
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===4},[])} width={"100%"}  onClick={()=>setSeelctedTab(4)}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>ГРАФИКИ</AppButon>
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===5},[])} width={"100%"}  onClick={()=>setSeelctedTab(5)}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>МНЕМОСХЕМА</AppButon>
                    </VFlexBox>
                    <VFlexBox width={"55%"} gap={"15px"}>
                        <VFlexBox   gap={"10px"} >
                            <VFlexBox className={cls.tableContentFlexbox}>
                                {/* <SubcatTabs selectedTab={selectedTab} onTabSelect={setSeelctedTab} /> */}
                                {/* <ParameterView className={cls.contentPaddings} configParameters={configParameters} params={params}/> */}
                                {selectedTab===3 && <ArchiveView id={String(deviceData?.id)} deviceData={deviceData}/>}
                                {selectedTab===0 && <ParameterView  params={params}/>}
                                {selectedTab===1 && <ParameterView  params={params}/>}
                                {selectedTab===2 && selectedParamGroup===0 && <SystemsInfoBLock systems={deviceData?.systems} />}
                                {selectedTab===2 && selectedParamGroup===1 && <ParameterView  params={instantParams}  />}
                                {selectedTab===2 && selectedParamGroup===2 && <ParameterView  params={accumulateParams}  />}
                                {selectedTab===2 && selectedParamGroup===3 && <ConfigParameterColumn  configParameters={configParameters}  />}
                                {selectedTab===5 && <ParameterView  params={params}/>}
                                {selectedTab===4 && <ParameterView  params={params}/>}
                                {selectedTab === 0 &&<Footer pollCallback={fetchEvents}/>}
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
