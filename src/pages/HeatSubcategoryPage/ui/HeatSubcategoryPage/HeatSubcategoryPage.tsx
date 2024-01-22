import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatSubcategoryPage.module.scss";

import { useState, type PropsWithChildren, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DetailView } from "widgets/DetailView";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { Footer } from "shared/ui/Footer/Footer";
import { getConfigParams, getHeatDevs } from "../../api/api";
import { HeatPoll, getHeatDeviceData } from "entities/Heatcounters";
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
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
    const {data:device,isLoading:isLoadingDevices} = getHeatDevs(id);
    const {data:deviceData,isLoading:isDevLoading,refetch} = getHeatDeviceData(device?.length ? String(device[0]) : undefined,{pollingInterval:15000});
    const {data:configParameters} = getConfigParams(String(deviceData?.systems[selectedSystem]?.id));
    const params:ParametersDict = {};
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);
    if (deviceData?.systems) {
        deviceData.systems.map((el)=>{
            const temp = el.parameters.filter((v)=>v.parameter_type==="instant_parameter");
            params[el.id] = {systemName:el.name,parameters:temp};
        });
    }
    const content = (
        <DetailView className={cls.detail}>
            <VFlexBox>
                <PageHeader generalData={generalData} />
                
                <HFlexBox className={cls.contentBox} gap="5px" align="space-around">
                    <VFlexBox align="flex-start" alignItems="center" width="23%">
                        <AppButon 
                            className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===0},[])} width={"100%"}
                            onClick={()=>setSeelctedTab(0)}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>ОБОБЩЕННАЯ ИНФОРМАЦИЯ</AppButon>
                        {selectedTab===0 && <GeneralInfoBlock deviceData={deviceData} address={generalData?.adress} name={generalData?.user_object_name} />}
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===1},[])} width={"100%"}  onClick={()=>setSeelctedTab(1)}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>СОБЫТИЯ</AppButon>
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===2},[])} width={"100%"}  onClick={()=>setSeelctedTab(2)}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>ПАРАМЕТРЫ</AppButon>
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
                                {selectedTab===0 && <ParameterView configParameters={configParameters} params={params}/>}
                                {selectedTab===1 && <ParameterView configParameters={configParameters} params={params}/>}
                                {selectedTab===2 && <ParameterView configParameters={configParameters} params={params}/>}
                                {selectedTab===5 && <ParameterView configParameters={configParameters} params={params}/>}
                                {selectedTab===4 && <ParameterView configParameters={configParameters} params={params}/>}
                                <Footer pollCallback={fetchEvents}/>
                            </VFlexBox>
                            {deviceData && deviceData.connection_info.connection_type!=="GSM" && <HeatPoll autoPoll={true} id={deviceData.id} onUpdate={()=>{refetch();refetchGeneral();}} />}
                            {deviceData && deviceData.connection_info.connection_type==="GSM" && <HeatPoll autoPoll={false} id={deviceData.id} onUpdate={()=>{refetch();refetchGeneral();}} />}
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
