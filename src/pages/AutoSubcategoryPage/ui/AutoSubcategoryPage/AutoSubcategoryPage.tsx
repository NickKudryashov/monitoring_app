import { PageHeader, getSubcatGeneralInfo } from "features/PageHeader";
import { PropsWithChildren, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { EventAnswer } from "shared/types/eventTypes";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { DetailView } from "widgets/DetailView";
import cls from "./AutoSubcategoryPage.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { SubcatTabs } from "features/SubcatTabs";
import { Footer } from "shared/ui/Footer/Footer";
import { getAutomaticDevice } from "entities/AutomaticDevice/api/AutomaticDeviceApi";
import { getAutomaticDevId } from "pages/AutoSubcategoryPage/api/api";
import $api from "shared/api";
import { GeneralInfoBlock } from "../GeneralInfo/GeneralInfo";
import { ParameterColumn } from "../ParameterColumn/ParameterColumn";
import { AutoPoll } from "entities/AutomaticDevice";
import { SystemCard } from "../SystemCard/SystemCard";
interface AutoSubcategoryPageProps {
    className?: string;
   }
const AutoSubcategoryPage = (props: PropsWithChildren<AutoSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const [selectedSystem,setSeelctedSystem] = useState(0);
    const [selectedTab,setSeelctedTab] = useState(2);
    const {data:generalData,refetch:refetchGeneral,} = getSubcatGeneralInfo(id);
    const {data:dataID,isLoading:isLoadingDataId} = getAutomaticDevId(id);
    const {data:devData,isLoading:devIsLoading,refetch:refetchDev} = getAutomaticDevice(dataID ? String(dataID[0]) : undefined);
    const fetchEvents = useCallback(async () => {
        const response = await $api.get<EventAnswer>("subcategory_events/"+id);
        return response.data;
    },[id]);
    console.log(devData);

    const systemsCard = [];
    if (devData) {
        for (let i = 0;i<devData.system_count;i++) {
            systemsCard.push(i+1);
        }
        
    }
    

    const content = (
        <DetailView className={cls.detail}>
            <VFlexBox>
                <PageHeader generalData={generalData} />
                <HFlexBox className={cls.contentBox} gap="5px">
                    <VFlexBox width={"41%"} className={classNames(cls.subcatCardBox,{},[])}  gap={"10px"}>
                        <GeneralInfoBlock deviceData={devData} />
                        {systemsCard.map((el,i)=>
                            <SystemCard key={i} index={el} params={devData.system_params} />)
                        }
                        {/* {deviceData?.systems?.map((el)=>
                               <div
                                   onClick={()=>setSeelctedSystem(el.index)} key={el.index}
                                   className={classNames(cls.deviceSystemCard,{[cls.deviceSystemCardSelected]:selectedSystem===el.index},[cls.cards,])}>
                                   <SystemCard system={el} />
                               </div>)} */}
                    </VFlexBox>
                    <VFlexBox gap={"15px"}>
                        <VFlexBox  gap={"10px"} >
                            <VFlexBox height={"84%"} className={cls.tableContentFlexbox}>
                                <SubcatTabs selectedTab={selectedTab} onTabSelect={setSeelctedTab} />
                                <HFlexBox>
                                    <ParameterColumn params={devData?.parameters?.slice(0,devData?.parameters.length / 2)} />
                                    <ParameterColumn params={devData?.parameters?.slice(devData?.parameters.length / 2)} />

                                </HFlexBox>
                            </VFlexBox>
                            <Footer pollCallback={fetchEvents}/>
                        </VFlexBox>
                    </VFlexBox>
                </HFlexBox>
            </VFlexBox>
        </DetailView>
    );
   
    return (
        <div  className={classNames(cls.AutoSubcategoryPage,{},[])}>
            {content}
            {devData && <AutoPoll autoPoll id={devData.id} onUpdate={refetchDev} />}
        </div>
    );
};
   
export default AutoSubcategoryPage;