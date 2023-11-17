import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatSubcategoryPage.module.scss";

import { useState, type PropsWithChildren, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DetailView } from "widgets/DetailView";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { Footer } from "shared/ui/Footer/Footer";
import { getConfigParams, getGeneralInfo, getHeatDevs } from "../api/api";
import { HeatPoll, getHeatDeviceData } from "entities/Heatcounters";
import { HeatParameters } from "entities/Heatcounters/types/type";
import $api from "shared/api";
import { EventAnswer } from "shared/types/eventTypes";

interface HeatSubcategoryPageProps {
 className?: string;
}

const PARAMBOX_MAPPER:Record<string,string> = {
    "instant_parameter":"Мгновенные параметры",
    "accumulate_parameter":"Накопленные параметры",
};

const MOCK_TS = [1,2,3,4];
const MOCK_PARAM = [1,2,3];
const MOCK_PARAM_VAL = [1,2,3,4,5,6,7,8,9,10,11];
const HeatSubcategoryPage = (props: PropsWithChildren<HeatSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const [selectedSystem,setSeelctedSystem] = useState(0);
    const [selectedTab,setSeelctedTab] = useState(2);
    const {data:generalData,refetch:refetchGeneral,} = getGeneralInfo(id);
    const {data:device,isLoading:isLoadingDevices} = getHeatDevs(id);
    const {data:deviceData,isLoading:isDevLoading,refetch} = getHeatDeviceData(device?.length ? String(device[0]) : undefined,{pollingInterval:15000});
    const {data:configParameters} = getConfigParams(String(deviceData?.systems[selectedSystem].id));
    console.log(configParameters);
    const params:Record<string,HeatParameters[]> = {accumulate_parameter:[],instant_parameter:[]};
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);
    if (deviceData) {
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
                <HFlexBox className={cls.headerBox}   gap={"5px"}>
                    <div className={classNames(cls.subcatNameBox,{},[cls.headers])}>
                        <div className={cls.subCatNameWrapper}>
                            <p className={cls.subsystemNameField}>{generalData ? generalData.subcat_name : "..."}</p>
                        </div>
                    </div>
                    <div className={classNames(cls.subcatObjectInfo,{},[cls.headers])}>
                        <HFlexBox className={cls.objectInfoContainer} gap="10px">
                            <VFlexBox  width="35%" align="space-around" className={cls.subcatObjectInfoTextGroup}>
                                <p>ОБЪЕКТ</p>
                                <div className={cls.subCatObjInfoWrapper}>
                                    <p className={cls.objectInfoTextField}>{generalData ? generalData.user_object_name : "..."}</p>
                                </div>

                            </VFlexBox>
                            <VFlexBox width="60%" align="space-around" className={cls.subcatObjectInfoTextGroup}>
                                <p>АДРЕС</p>
                                <div className={cls.subCatObjInfoWrapper}>
                                    <p className={cls.objectInfoTextField}>{generalData ? generalData.adress : "..."}</p>
                                </div>
                            </VFlexBox>
                        </HFlexBox>
                    </div>
                </HFlexBox>
                <HFlexBox className={cls.contentBox} gap="5px">
                    <VFlexBox className={classNames(cls.subcatCardBox,{},[])}  gap={"10px"}>
                        <div className={classNames(cls.generalDeviceInfoCard,{},[cls.cards,])}>
                            <VFlexBox gap="10px" align="space-around" >
                                <p className={cls.generalInfoTitle}>ОБОБЩЕННАЯ ИНФОРМАЦИЯ</p>
                                <div className={classNames(cls.generalCardTextWrapper,{},[cls.longTextGeneralCard,])}>
                                    <p className={cls.deviceDate}>дата изготовления</p>
                                </div>
                                <HFlexBox className={cls.generalCardItems} align="space-between">
                                    <div className={cls.generalCardTextWrapper}>
                                        <p>{`количество систем: ${deviceData?.systems?.length ?? "..."}`}</p>
                                    </div>
                                    <div className={cls.generalCardTextWrapper}>
                                        <p>{`тип счетчика: ${deviceData?.device_type_verbose_name ?? "..."}`}</p>
                                    </div>
                                </HFlexBox>
                                <HFlexBox className={cls.generalCardItems} align="space-between">
                                    <div className={cls.generalCardTextWrapper}>
                                        <p>{`номер счетчика: №${deviceData?.device_num ?? "..."}`}</p>
                                    </div>
                                    <div className={cls.generalCardTextWrapper}>
                                        <p>поверка счетчика</p>
                                    </div>
                                </HFlexBox>
                            </VFlexBox>
                        </div>
                        {deviceData?.systems?.map((el)=> <div onClick={()=>setSeelctedSystem(el.index)} key={el.index} className={classNames(cls.deviceSystemCard,{[cls.deviceSystemCardSelected]:selectedSystem===el.index},[cls.cards,])}>
                            <HFlexBox>
                                <VFlexBox className={cls.systemCardFlexInfoPart}>
                                    <p className={cls.systemCardTitle}>
                                        {`ТЕПЛОВАЯ СИСТЕМА ${el.index+1}`}
                                    </p>
                                    <p className={cls.systemNameField}>
                                        {el.name}
                                    </p>
                                    <div className={cls.systemInformation}>
                                        <VFlexBox gap={"5px"}>
                                            <div>
                                                <p>СХЕМА</p>
                                                <p>{el.schema}</p>
                                            </div>
                                            <div>
                                                <p>ФОРМУЛА</p>
                                                <p>{el.formula}</p>

                                            </div>
                                        </VFlexBox>

                                    </div>
                                </VFlexBox>
                                <VFlexBox gap="5px" align="center" alignItems="center">
                                    <p>АВАРИИ</p>
                                    <div className={cls.eventWrapper}>
                                        0
                                    </div>
                                    <p>СОБЫТИЯ</p>
                                    <div className={cls.eventWrapper}>
                                        0
                                    </div>
                                </VFlexBox>
                            </HFlexBox>
                        </div>)}
                    </VFlexBox>
                    <VFlexBox gap={"15px"}>
                        <VFlexBox  gap={"10px"} >
                            <VFlexBox height={"81.5%"} className={cls.tableContentFlexbox}>
                                <HFlexBox className={cls.tableHeadersFlexbox}>
                                    <div onClick={()=>setSeelctedTab(1)} className={classNames(cls.tabHeaderButton,{[cls.selectedTab]:selectedTab===1},[cls.tabLeftButton,])}>
                                        <p>МНЕМОСХЕМА</p>
                                    </div>
                                    <div onClick={()=>setSeelctedTab(2)} className={classNames(cls.tabHeaderButton,{[cls.selectedTab]:selectedTab===2},[])}>
                                        <p>ПАРАМЕТРЫ</p>
                                    </div>
                                    <div onClick={()=>setSeelctedTab(3)} className={classNames(cls.tabHeaderButton,{[cls.selectedTab]:selectedTab===3},[])}>
                                        <p>АРХИВЫ</p>
                                    </div>
                                    <div onClick={()=>setSeelctedTab(4)} className={classNames(cls.tabHeaderButton,{[cls.selectedTab]:selectedTab===4},[cls.tabRightButton,])}>
                                        <p>ГРАФИКИ</p>
                                    </div>
                                </HFlexBox>
                                <HFlexBox className={cls.paramGroups} gap="10px" align="center" alignItems="center">
                                    {Object.keys(PARAMBOX_MAPPER).map((el)=>
                                        <VFlexBox alignItems="center" key={el} className={cls.paramFlexBox}>
                                            <div className={cls.paramBoxHeader}>
                                                <p>{PARAMBOX_MAPPER[el]}</p>
                                            </div>
                                            <VFlexBox>
                                                { params[el]?.map((elem)=>  
                                                    <HFlexBox height={"9%"} className={cls.paramRow} key={elem.id} alignItems="end" align="space-around">
                                                        <p className={cls.paramNameField}>{elem.name}</p>
                                                        <VFlexBox className={cls.valueFlexBox}>
                                                            <p>{elem.dimension}</p>
                                                            <div className={cls.paramValueWrapper}>
                                                                <p>{elem.value}</p>
                                                            </div>
                                                        </VFlexBox>
                                                        <div className={cls.paramVerboseWrapper}>
                                                            <p>{elem.verbose_name}</p>
                                                        </div>
                                                    </HFlexBox>
                                                )}
                                            </VFlexBox>
                                        </VFlexBox>
                                    )}
                                    <VFlexBox alignItems="center" className={classNames(cls.paramFlexBox,{},[cls.configFlexBox,])}>
                                        <div className={cls.paramBoxHeader}>
                                            <p>{"Предустановленные параметры"}</p>
                                        </div>
                                        <VFlexBox>
                                            { configParameters?.map((elem,i)=>  
                                                <HFlexBox height="30px"  className={classNames(cls.paramRow,{},[cls.confParamRow])} key={i} gap="15px" alignItems="start" align="space-around">
                                                    <p className={cls.paramNameField}>{elem.name}</p>
                                                    {/* <HFlexBox width="30%"> */}
                                                    <p>номер</p>
                                                    <div className={classNames(cls.paramValueWrapper,{},[cls.configParams,])}>
                                                        <p>{elem.gnum}</p>
                                                    </div>
                                                    {/* </HFlexBox> */}
                                                    
                                                    {/* <HFlexBox width="30%"> */}
                                                    <p>min</p>
                                                    <div className={classNames(cls.paramValueWrapper,{},[cls.configParams,])}>
                                                        <p>{elem.min}</p>
                                                    </div>
                                                    {/* </HFlexBox> */}
                                                    {/* <HFlexBox width="30%"> */}
                                                    <p>max</p>
                                                    <div className={classNames(cls.paramValueWrapper,{},[cls.configParams,])}>
                                                        <p>{elem.max}</p>
                                                    </div>
                                                    {/* </HFlexBox> */}
                                                    
                                                </HFlexBox>
                                            )}
                                        </VFlexBox>
                                    </VFlexBox>
                                </HFlexBox>
                            </VFlexBox>
                            {deviceData && <HeatPoll autoPoll={true} id={deviceData.id} onUpdate={()=>{refetch();refetchGeneral();}} />}
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
