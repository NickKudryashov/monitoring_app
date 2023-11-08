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
import { Footer } from "shared/ui/Footer/Footer";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";

interface AdministrationPageProps {
 className?: string;
}




const AdministrationPage = memo((props: PropsWithChildren<AdministrationPageProps>) => {
    const { className } = props;
    let content;

    content = (
        <DetailView >
            <HFlexBox align={"space-around"} className={cls.detail} >
                <div className={cls.buttonBox}>
                    <VFlexBox gap="15px">
                        <p className={cls.buttonBoxTitle}>НАСТРОЙКИ КОМПАНИИ</p>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>Информация о компании</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>Добавить адрес объекта</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>Добавить системы в объекты</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>Модули настройка</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>Настройка архива</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>Настройки доступов жителям</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>Настройки CRM системы</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>Настройка архива</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>Настройка доступа подрядной организации</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY}>ещё какая-то настройка</AppButon>
                    </VFlexBox>
                </div>
                <div className={cls.buttonBox}>
                    <VFlexBox gap="15px">
                        <p className={cls.buttonBoxTitle}>ЛИЧНЫЙ КАБИНЕТ</p>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Персональная информация</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Добавить сотрудников</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Типы заявок</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Типы заявок</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Заглушка</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Заглушка</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Заглушка</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Заглушка</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Заглушка</AppButon>
                        <AppButon className={cls.btn} theme={AppButtonTheme.DESIGNED_PRIMARY} >Заглушка</AppButon>
                        
                    </VFlexBox>
                </div>
            </HFlexBox>
        </DetailView>
    );

    return (
        // <MainLayout
        //     className={classNames(cls.AdministrationPage,{},[className])}
        //     navbar={<Navbar/>}
        //     deviceList={<DeviceList/>}
        //     DetailView={content}
        //     footer={<Footer/>}
        // />
        <div className={classNames(cls.AdministrationPage, {}, [className])}>
            {content}
        </div>

    );
});

export default AdministrationPage;