import classNames from "shared/lib/classNames/classNames";
import { memo, useState } from "react";
import cls from "./AdministrationPage.module.scss";

import type { PropsWithChildren } from "react";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { DetailView } from "widgets/DetailView";
import { AppTab, AppTabThemes } from "shared/ui/AppTab/AppTab";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";
import { AddCard, DetailInformation, OrganisationCard } from "entities/Organization";
import { StaffRow, StaffRowAdd } from "entities/Staff";
import { CategoryRow } from "entities/Category";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";

interface AdministrationPageProps {
 className?: string;
}
const ADMINISTRATIONPAGETABSKEY = "administration_tab_index";
const mockTabs = [{name:"Организация",index:0,Content:MockComponent},
    {name:"Пользователи и роли",index:1,Content: MockComponent},
    {name:"Управление категориями",index:2,Content:MockComponent},
    {name:"Управление объектами",index:3,Content:MockComponent},
    {name:"Управление отчетами",index:4,Content:MockComponent}];

const MOCK_TREE = [
    {pid:0,name:"УК",id:1},
    {pid:1,name:"Решаем Вместе",id:2},
    {pid:1,name:"Сфера-М",id:3},
    {pid:0,name:"ИП",id:4},
    {pid:4,name:"ИП Лунев",id:5},
    {pid:4,name:"ИП Меспорян",id:6},

];



const AdministrationPage = memo((props: PropsWithChildren<AdministrationPageProps>) => {
    const { className } = props;
    let content;
    let prev_id:number;
    const [selectedFeature,setSelectedFeature] = useState<number>(0);
    const changeTabIndex = (index:number) => {
        localStorage.setItem(ADMINISTRATIONPAGETABSKEY,String(index));
        if (index===0) {
            setSelectedFeature(0);
        }
        if (index===1) {
            setSelectedFeature(2);
        }
        if (index===2) {
            setSelectedFeature(3);
        }
    };

    const getTabIndex = ()=>{
        const index = localStorage.getItem(ADMINISTRATIONPAGETABSKEY) || 0;
        return Number(index);
    };

    const buttonContent = (
        <div className={cls.tabs}>
            <AppButon className={cls.btn} onClick={()=>changeTabIndex(0)} theme={AppButtonTheme.SHADOW}>Организация</AppButon>
            <AppButon className={cls.btn} onClick={()=>changeTabIndex(1)} theme={AppButtonTheme.SHADOW}>Пользователи и роли</AppButon>
            <AppButon className={cls.btn} onClick={()=>changeTabIndex(2)} theme={AppButtonTheme.SHADOW}>Управление категориями</AppButon>
            <AppButon className={cls.btn} onClick={()=>changeTabIndex(3)} theme={AppButtonTheme.SHADOW}>Управление объектами</AppButon>
            <AppButon className={cls.btn} onClick={()=>changeTabIndex(4)} theme={AppButtonTheme.SHADOW}>Управление отчетами</AppButon>
        </div>
    );


    if (selectedFeature===0){
        content = (
            <DetailView className={cls.detail}>
                {buttonContent}
                <div className={cls.cards} onClick={()=>setSelectedFeature(1)}>
                    <OrganisationCard/>
                    <OrganisationCard/>
                    <OrganisationCard/>
                    <OrganisationCard/>
                    <AddCard/>
                </div>
            </DetailView>
        );}
    if (selectedFeature===1){
        content = (
            <DetailView className={cls.detail}>
                {buttonContent}
                <div className={cls.orgData} onClick={()=>setSelectedFeature(1)}>
                    <DetailInformation/>
                </div>
            </DetailView>
        );}

    if (selectedFeature===2){
        content = (
            <DetailView className={cls.detail}>
                {buttonContent}
                <div className={cls.orgData}>
                    <StaffRowAdd/>
                    <StaffRow/>
                </div>
            </DetailView>
        );}
    if (selectedFeature===3){
        content = (
            <DetailView className={cls.detail}>
                {buttonContent}
                <div className={cls.orgData}>
                    {MOCK_TREE.map((el)=>{
                        if (el.pid===prev_id) {
                            return <CategoryRow key={el.id} className={cls.offset} name={el.name}/>;
                        }
                        else {
                            prev_id=el.id;
                            return <CategoryRow key={el.id}name={el.name}/>;
                        }
                    }
                    )
                    }
                </div>
            </DetailView>
        );}
    return (
        <MainLayout
            className={classNames(cls.AdministrationPage,{},[className])}
            navbar={<Navbar/>}
            deviceList={<DeviceList/>}
            DetailView={content}
        />

    );
});

export default AdministrationPage;