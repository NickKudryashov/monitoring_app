import classNames from "shared/lib/classNames/classNames";
import cls from "./HeatSubcategoryPage.module.scss";

import { useState, type PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { DetailView } from "widgets/DetailView";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { Footer } from "shared/ui/Footer/Footer";

interface HeatSubcategoryPageProps {
 className?: string;
}
const MOCK_TS = [1,2,3,4];
const MOCK_PARAM = [1,2,3];
const MOCK_PARAM_VAL = [1,2,3,4,5,6,7,8,9,10,11];
const HeatSubcategoryPage = (props: PropsWithChildren<HeatSubcategoryPageProps>) => {
    const { className } = props;
    const {id} = useParams<{id:string}>();
    const [selectedSystem,setSeelctedSystem] = useState(1);
    const [selectedTab,setSeelctedTab] = useState(2);

    const content = (
        <DetailView className={cls.detail}>
            <VFlexBox>
                <HFlexBox className={cls.headerBox}   gap={"5px"}>
                    <div className={classNames(cls.subcatNameBox,{},[cls.headers])}>
                        <div className={cls.subCatNameWrapper}>
                            <p className={cls.subsystemNameField}>НАИМЕНОВАНИЕ УЗЛА</p>
                        </div>
                    </div>
                    <div className={classNames(cls.subcatObjectInfo,{},[cls.headers])}>
                        <HFlexBox className={cls.objectInfoContainer} gap="10px">
                            <VFlexBox align="space-around" className={cls.subcatObjectInfoTextGroup}>
                                <p>Объект</p>
                                <div className={cls.subCatObjInfoWrapper}>
                                    <p className={cls.objectInfoTextField}>Детский сад .....</p>
                                </div>

                            </VFlexBox>
                            <VFlexBox align="space-around" className={cls.subcatObjectInfoTextGroup}>
                                <p>Адрес</p>
                                <div className={cls.subCatObjInfoWrapper}>
                                    <p className={cls.objectInfoTextField}>г. Дмитров, ул. Произвольная д. 123</p>
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
                                        <p>количество систем</p>
                                    </div>
                                    <div className={cls.generalCardTextWrapper}>
                                        <p>тип счетчика</p>
                                    </div>
                                </HFlexBox>
                                <HFlexBox className={cls.generalCardItems} align="space-between">
                                    <div className={cls.generalCardTextWrapper}>
                                        <p>информация</p>
                                    </div>
                                    <div className={cls.generalCardTextWrapper}>
                                        <p>поверка счетчика</p>
                                    </div>
                                </HFlexBox>
                            </VFlexBox>
                        </div>
                        {MOCK_TS.map((el,i)=> <div onClick={()=>setSeelctedSystem(el)} key={i} className={classNames(cls.deviceSystemCard,{[cls.deviceSystemCardSelected]:selectedSystem===el},[cls.cards,])}>
                            <HFlexBox>
                                <VFlexBox className={cls.systemCardFlexInfoPart}>
                                    <p className={cls.systemCardTitle}>
                                        {`Тепловая система ${i}`}
                                    </p>
                                    <p>
                                        Контур теплосети
                                    </p>
                                    <div className={cls.systemInformation}>
                                        <VFlexBox gap={"5px"}>
                                            <div>
                                                <p>СХЕМА</p>
                                                <p>М[2ип]</p>
                                            </div>
                                            <div>
                                                <p>ФОРМУЛА</p>
                                                <p>Q=M1*(h1-h2)+Mп*(h2-hx)</p>

                                            </div>
                                        </VFlexBox>

                                    </div>
                                </VFlexBox>
                                <VFlexBox gap="5px" align="center" alignItems="center">
                                    <p>АВАРИИ</p>
                                    <div className={cls.eventWrapper}>
                                        1
                                    </div>
                                    <p>СОБЫТИЯ</p>
                                    <div className={cls.eventWrapper}>
                                        2
                                    </div>
                                </VFlexBox>
                            </HFlexBox>
                        </div>)}
                    </VFlexBox>
                    <VFlexBox gap={"15px"}>
                        <VFlexBox>
                            <VFlexBox className={cls.tableContentFlexbox}>
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
                                <HFlexBox className={cls.paramGroups} gap="15px" align="space-around" alignItems="center">
                                    {MOCK_PARAM.map((el,i)=>
                                        <VFlexBox alignItems="center" key={i} className={cls.paramFlexBox}>
                                            <div className={cls.paramBoxHeader}>
                                                <p>Мгновенные параметры</p>
                                            </div>
                                            <VFlexBox>
                                                { MOCK_PARAM_VAL.map((el,i)=>
                                                    <HFlexBox height={"9%"} className={cls.paramRow} key={i} alignItems="end" align="space-around">
                                                        <p className={cls.paramNameField}>G1</p>
                                                        <VFlexBox className={cls.valueFlexBox}>
                                                            <p>{"м3/ч"}</p>
                                                            <div className={cls.paramValueWrapper}>
                                                                <p>{"54.75"}</p>
                                                            </div>
                                                        </VFlexBox>
                                                        <div className={cls.paramVerboseWrapper}>
                                                            <p>мгновенный расход</p>
                                                        </div>
                                                    </HFlexBox>
                                                )}
                                            </VFlexBox>
                                        </VFlexBox>
                                    )}
                                </HFlexBox>
                            </VFlexBox>
                            <Footer/>
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
