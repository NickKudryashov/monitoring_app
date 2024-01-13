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

interface HeatSubcategoryPageProps {
 className?: string;
}

export type ParametersDict = Record<string,HeatParameters[]>

const MOCK_TS = [1,2,3,4];
const MOCK_PARAM = [1,2,3];
const MOCK_PARAM_VAL = [1,2,3,4,5,6,7,8,9,10,11];
const HeatSubcategoryPage = (props: PropsWithChildren<HeatSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const [selectedSystem,setSeelctedSystem] = useState(0);
    const [selectedTab,setSeelctedTab] = useState(2);
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
    const {data:device,isLoading:isLoadingDevices} = getHeatDevs(id);
    const {data:deviceData,isLoading:isDevLoading,refetch} = getHeatDeviceData(device?.length ? String(device[0]) : undefined,{pollingInterval:15000});
    const {data:configParameters} = getConfigParams(String(deviceData?.systems[selectedSystem]?.id));
    const params:ParametersDict = {accumulate_parameter:[],instant_parameter:[]};
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);
    if (deviceData?.systems[selectedSystem]?.parameters) {
        deviceData.systems[selectedSystem].parameters.map((el)=>{
            if (el.parameter_type==="accumulate_parameter") {
                params.accumulate_parameter.push(el);
            }
            else {
                params.instant_parameter.push(el);
            }
        });
    }
    const content = (
        <DetailView className={cls.detail}>
            <VFlexBox>
                <PageHeader generalData={generalData} />
                <HFlexBox className={cls.contentBox} gap="5px">
                    <VFlexBox className={classNames(cls.subcatCardBox,{},[])}  gap={"10px"}>
                        <GeneralInfoBlock deviceData={deviceData} />
                        {deviceData?.systems?.map((el)=>
                            <div
                                onClick={()=>setSeelctedSystem(el.index)} key={el.index}
                                className={classNames(cls.deviceSystemCard,{[cls.deviceSystemCardSelected]:selectedSystem===el.index},[cls.cards,])}>
                                <SystemCard system={el} />
                            </div>)}
                    </VFlexBox>
                    <VFlexBox gap={"15px"}>
                        <VFlexBox  gap={"10px"} >
                            <VFlexBox height={"81.5%"} className={cls.tableContentFlexbox}>
                                <SubcatTabs selectedTab={selectedTab} onTabSelect={setSeelctedTab} />
                                {/* <ParameterView className={cls.contentPaddings} configParameters={configParameters} params={params}/> */}
                                {selectedTab===3 && <ArchiveView id={String(deviceData?.id)} deviceData={deviceData}/>}
                                {selectedTab===2 && <ParameterView configParameters={configParameters} params={params}/>}
                                {selectedTab===1 && <ParameterView configParameters={configParameters} params={params}/>}
                                {selectedTab===4 && <ParameterView configParameters={configParameters} params={params}/>}
                            </VFlexBox>
                            {deviceData && deviceData.connection_info.connection_type!=="GSM" && <HeatPoll autoPoll={true} id={deviceData.id} onUpdate={()=>{refetch();refetchGeneral();}} />}
                            <Footer pollCallback={fetchEvents}/>
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
