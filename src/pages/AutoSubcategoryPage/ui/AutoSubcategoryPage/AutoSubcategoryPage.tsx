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
import { getAutomaticDevId } from "pages/AutoSubcategoryPage/api/api";
import $api from "shared/api";
import { ParameterColumn } from "../ParameterColumn/ParameterColumn";
import { useAutoPoll } from "entities/AutomaticDevice";
import { GeneralInfoBlock } from "features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { SubcategoryTabs } from "widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { PumpParameter } from "entities/AutomaticDevice/model/types/AutomaticDeviceTypes";
import { Footer } from "shared/ui/Footer/Footer";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
interface AutoSubcategoryPageProps {
    className?: string;
   }

export interface ParamRecord {
    parameters:PumpParameter[];
    name:string;
}

interface AutoParamsDict {
    [key:string]:ParamRecord[];
}
const AutoSubcategoryPage = (props: PropsWithChildren<AutoSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const [selectedSystem,setSeelctedSystem] = useState(0);
    const [selectedTab,setSeelctedTab] = useState(0);
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
    const {data:dataID,isLoading:isLoadingDataId} = getAutomaticDevId(id);
    const {data:devData,isLoading:devIsLoading,refetch:refetchDev} = getAutomaticDevice(dataID ? String(dataID[0]) : undefined);
    const poll = useAutoPoll({id:devData?.id,onUpdate:refetchDev,autoPoll:devData?.connection_info?.connection_type!=="GSM"});
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);
    const paramDict = useMemo(()=>{
        if (!devData) {
            return {};
        }
        const temp :AutoParamsDict = {};    
        devData?.parameters?.map((gr)=>{
            const tempIndex = String(gr.index===0 ? 2 : gr.index);
            temp[tempIndex] ?
                temp[tempIndex] = [...temp[tempIndex],{name:gr.name,parameters:gr.parameters}] :
                temp[tempIndex] = [{name:gr.name,parameters:gr.parameters}];
        });
        return temp;
    }
    ,[devData]);
    
    const paramDictSystems = useMemo(()=>{
        if (!devData) {
            return {};
        }
        const temp :AutoParamsDict = {};    
        devData?.system_params?.map((gr)=>{
            const tempIndex = String(gr.index===0 ? 2 : gr.index);
            temp[tempIndex] ?
                temp[tempIndex] = [...temp[tempIndex],{name:gr.name,parameters:gr.parameters}] :
                temp[tempIndex] = [{name:gr.name,parameters:gr.parameters}];
        });
        return temp;
    }
    ,[devData]);

    const systemsCard = [];
    if (devData) {
        for (let i = 0;i<devData.system_count;i++) {
            systemsCard.push(i+1);
        }
        
    }
    

    const content = (
        <DetailView>
            <VFlexBox width="90%">
                <PageHeader poll={poll} generalData={generalData}/>
                
                <HFlexBox className={cls.contentBox} gap="5px" align="space-between">
                    <SubcategoryTabs
                        selectedTab={selectedTab}
                        setSelectedTab={setSeelctedTab}
                        content={
                            {
                                0:<GeneralInfoBlock device_num={devData?.device_num} device_type_verbose_name={devData?.device_type_verbose} systems={devData?.system_count} address={generalData?.adress} name={generalData?.user_object_name} />,
                                2:<VFlexBox className={cls.paramTitleBox} gap={"10px"}/>
                            }
                        }
                    />
                    <VFlexBox width={ "70%"} gap={"15px"}>
                        <VFlexBox   gap={"10px"} >
                            <PanelGroup
                                direction="vertical"
                                autoSaveId="example"
                            >
                                <Panel defaultSize={75}>
                        
                                    <HFlexBox gap="30px" className={cls.tableContentFlexbox}>
                                        {selectedTab===0 && devData &&
                                Object.values(paramDictSystems).map((el,i)=>
                                    <ParameterColumn fullHeight key={i} header={`Контур ${i+1}`}  params={el}/>)
                                        }
                                        {
                                            selectedTab===2 && paramDict && 
                                    Object.values(paramDict).map((params,i)=>
                                        <ParameterColumn detail fullHeight key={i} header={`Контур ${i+1}`} params={params}/>
                                    )
                                        }
                                   
                                    </HFlexBox>
                                </Panel>
                                <PanelResizeHandle />
                                <Footer pollCallback={fetchEvents} />
                            </PanelGroup>
                        </VFlexBox>
                    </VFlexBox>
                </HFlexBox>
            </VFlexBox>
        </DetailView>
    );
   
    return (
        <div  className={classNames(cls.AutoSubcategoryPage,{},[])}>
            {content}
            {/* {devData && <AutoPoll autoPoll id={devData.id} onUpdate={refetchDev} />} */}
        </div>
    );
};
   
export default AutoSubcategoryPage;