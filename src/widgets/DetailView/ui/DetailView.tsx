import classNames from "shared/lib/classNames/classNames";
import cls from "./DetailView.module.scss";

import { PropsWithChildren, ReactNode, useState } from "react";
import { useAppSelector } from "shared/hooks/hooks";
import { CategoryCard } from "entities/Category";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { AppTab } from "shared/ui/AppTab/AppTab";
import { GeneralInformation } from "features/GeneralInformation";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";

interface DetailViewProps {
 className?: string;
 children?:ReactNode[];
 tabSelected?:boolean;
 setTabSelected?:(val:boolean)=>void;
}

export function DetailView(props: DetailViewProps) {
    const { className,children,setTabSelected,tabSelected } = props;
    const {categories} = useAppSelector(state=>state.categoryReducer);
    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <AppTab
                selected = {tabSelected} 
                setTabSelected = {setTabSelected}
                tabs={
                    [
                        {name:"Главная",index:0,Content:GeneralInformation},
                        {name:"События",index:1,Content:MockComponent},
                        {name:"Объекты на карте",index:2,Content:MockComponent},
                        {name:"Архивы",index:3,Content:MockComponent},
                        {name:"Автоопрос",index:4,Content:MockComponent}
                    ]}
            >
                {!tabSelected && children}
            </AppTab>
            {/* <ObjectCategoryView/> */}
        </div>
    );
}