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
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { getPumpData, usePumpPoll } from "entities/PumpDevice";
import { getPumpDevs } from "pages/PumpSubcategoryPage/api/pumpApi";
import { GeneralInfoBlock } from "pages/HeatSubcategoryPage/ui/GeneralInfoBlock/GeneralInfoBlock";
import { PumpParameter } from "entities/PumpDevice/model/types/pumpDevice";
import { ParameterColumn } from "../ParameterView/ParameterView";

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
    const [selectedParamGroup,setSelectedParamGroup] = useState(undefined);
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
    const {data:device,isLoading:isLoadingDevices} = getPumpDevs(id);
    const {data:deviceData,isLoading:isDevLoading,refetch} = getPumpData(device?.length ? String(device[0]) : undefined,{pollingInterval:15000});
    const poll = usePumpPoll({autoPoll:deviceData?.connection_info.connection_type!=="GSM",id:deviceData?.id,onUpdate:()=>{refetch();refetchGeneral();}});
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);
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
            <VFlexBox>
                <PageHeader poll={poll} generalData={generalData}/>
                
                <HFlexBox className={cls.contentBox} gap="5px" align="space-around">
                    <VFlexBox align="flex-start" alignItems="center" width="23%">
                        <AppButon 
                            className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===0},[])} width={"100%"}
                            onClick={()=>setSeelctedTab(0)}  theme={AppButtonTheme.SUBCATEGORY_BUTTON}>ОБОБЩЕННАЯ ИНФОРМАЦИЯ</AppButon>
                        {selectedTab===0 && <GeneralInfoBlock device_num={deviceData?.device_num} device_type_verbose_name={deviceData?.device_type_verbose_name} systems={0} address={generalData?.adress} name={generalData?.user_object_name} />}
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===1},[])} width={"100%"}   theme={AppButtonTheme.SUBCATEGORY_BUTTON}>СОБЫТИЯ</AppButon>
                        <AppButon onClick={()=>setSeelctedTab(2)} className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===2},[])} width={"100%"}    theme={AppButtonTheme.SUBCATEGORY_BUTTON}>ПАРАМЕТРЫ</AppButon>
                        {selectedTab===2 && 
                        <VFlexBox className={cls.paramTitleBox} gap={"10px"}>
                            {Object.keys(params)?.map((grName,i)=>
                                <p key={i} onClick={()=>setSelectedParamGroup(i)} className={classNames(cls.paramTitle,{[cls.paramTitleSelected]:selectedParamGroup===i},[])}>{grName}</p>
                            )}
                        </VFlexBox>
                        }
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===3},[])} width={"100%"}    theme={AppButtonTheme.SUBCATEGORY_BUTTON}>АРХИВЫ</AppButon>
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===4},[])} width={"100%"}    theme={AppButtonTheme.SUBCATEGORY_BUTTON}>ГРАФИКИ</AppButon>
                        <AppButon className={classNames(cls.btns,{[cls.selectedBtn]:selectedTab===5},[])} width={"100%"}    theme={AppButtonTheme.SUBCATEGORY_BUTTON}>МНЕМОСХЕМА</AppButon>
                    </VFlexBox>
                    <VFlexBox width={"55%"} gap={"15px"}>
                        <VFlexBox   gap={"10px"} >
                            <VFlexBox className={cls.tableContentFlexbox}>
                                {/* <SubcatTabs selectedTab={selectedTab} onTabSelect={setSeelctedTab} /> */}
                                {/* <ParameterView className={cls.contentPaddings} configParameters={configParameters} params={params}/> */}
                                {
                                    deviceData && deviceData.parameters &&
                                    <HFlexBox height={"90%"} className={classNames(cls.paramGroups,{},[className,])} align="flex-start" alignItems="start">
                                        {selectedTab===0 && Object.keys(params)?.map((grName,i)=>
                                            <ParameterColumn key={i} params={params[grName]} header={grName}  />
                            
                                        )}
                                        {selectedTab===2 && Object.keys(params)?.map((grName,i)=> i===selectedParamGroup && 
                                            <ParameterColumn fullWidth key={i} params={params[grName]} header={grName}  />
                            
                                        )}
                                    </HFlexBox>

                                }
                                <Footer pollCallback={fetchEvents}/>
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
