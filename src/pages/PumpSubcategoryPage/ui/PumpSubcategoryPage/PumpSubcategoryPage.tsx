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
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { DetailParameter, getPumpData, getPumpDataDetail, usePumpPoll } from "entities/PumpDevice";
import { getPumpDevs } from "pages/PumpSubcategoryPage/api/pumpApi";
import { GeneralInfoBlock } from "features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
import { ParameterColumn } from "../ParameterView/ParameterView";
import { SubcategoryTabs } from "widgets/SubcategoryTabs/ui/SubcategoryTabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface PumpSubcategoryPageProps {
 className?: string;
}

export type ParametersDict = Record<string,PumpParameter[]>

const MOCK_TS = [1,2,3,4];
const MOCK_PARAM = [1,2,3];
const MOCK_PARAM_VAL = [1,2,3,4,5,6,7,8,9,10,11];
const PumpSubcategoryPage = (props: PropsWithChildren<PumpSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const [selectedSystem,setSeelctedSystem] = useState(0);
    const [selectedTab,setSeelctedTab] = useState(0);
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
    const {data:device,isLoading:isLoadingDevices} = getPumpDevs(id);
    const {data:deviceData,isLoading:isDevLoading,refetch} = getPumpData(device?.length ? String(device[0]) : undefined,{pollingInterval:15000}); 
    const {data:deviceDataDetail,isLoading:isDevDetailLoading1,refetch:refetchDetail} = getPumpDataDetail(device?.length ? String(device[0]) : undefined,{pollingInterval:15000});
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
    const params = useMemo(()=>getParams(),[deviceData]);
    const content = (
        <DetailView className={cls.detail}>
            <VFlexBox width={"90%"}>
                <PageHeader poll={poll} generalData={generalData}/>
                
                <HFlexBox className={cls.contentBox} gap="5px" align="space-between">
                    <SubcategoryTabs
                        selectedTab={selectedTab}
                        setSelectedTab={setSeelctedTab}
                        content={
                            {
                                0:<GeneralInfoBlock device_num={deviceData?.device_num} device_type_verbose_name={deviceData?.device_type_verbose_name} systems={0} address={generalData?.adress} name={generalData?.user_object_name} />,
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

                                        {/* <SubcatTabs selectedTab={selectedTab} onTabSelect={setSeelctedTab} /> */}
                                        {/* <ParameterView className={cls.contentPaddings} configParameters={configParameters} params={params}/> */}
                                        {
                                            deviceData && deviceData.parameters &&
                                            <HFlexBox  className={classNames(cls.paramGroups,{},[className,])} align="center" alignItems="start">
                                                {selectedTab===0 && Object.keys(params)?.map((grName,i)=>
                                                    <ParameterColumn key={i} params={params[grName]} header={grName}  />
                            
                                                )}
                                                {selectedTab===2 && deviceDataDetail && selectedParamSubGroup.includes("НЕИСПР") &&
                                                <DetailParameter errors={deviceDataDetail[selectedParamGroup]?.errors}  header={selectedParamSubGroup}  />
                            
                                                }
                                                {selectedTab===2 && deviceDataDetail && selectedParamSubGroup.includes("ОБЩ") &&
                                                <DetailParameter  params={deviceDataDetail[selectedParamGroup]?.general} header={selectedParamSubGroup}  />
                            
                                                }
                                            </HFlexBox>

                                        }
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
        <div  className={classNames(cls.PumpSubcategoryPage,{},[])}>
            {content}
        </div>
    );
};

export default PumpSubcategoryPage;
