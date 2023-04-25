import classNames from "shared/lib/classNames/classNames";
import cls from "./DetailView.module.scss";

import { PropsWithChildren, ReactNode, useState } from "react";
import { CategoryCard, categorySlice } from "entities/Category";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { AppTab } from "shared/ui/AppTab/AppTab";
import { GeneralInformation } from "features/GeneralInformation";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";
import { useAppDispatch } from "shared/hooks/hooks";

interface DetailViewProps {
 className?: string;
 children?:ReactNode[];
 tabSelected?:boolean;
 generalSelected?:boolean;
 setTabSelected?:(val:boolean)=>void;
 setGeneralSelected?:(val:boolean)=>void;
}

export function DetailView(props: DetailViewProps) {
    const { className,children,setTabSelected,tabSelected,generalSelected,setGeneralSelected } = props;
    const dispatch = useAppDispatch();
    if (generalSelected && tabSelected) {
        setTabSelected(false);
    }

    const tabHandler = (val:boolean)=> {
        setTabSelected(val);
        setGeneralSelected(false);
    };
    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <AppTab
                selected = {tabSelected} 
                setTabSelected = {tabHandler}
                tabs={
                    [
                        // {name:"Общее",index:0,Content:GeneralInformation},
                        {name:"Общее",index:0,Content:GeneralInformation},
                        {name:"События",index:1,Content: MockComponent},
                        {name:"Объекты на карте",index:2,Content:MockComponent},
                        {name:"Архивы",index:3,Content:MockComponent},
                        {name:"Автоопрос",index:4,Content:MockComponent},
                        // {name:"Главная",index:5,Content:MockComponent},
                    ]}
            >
                {generalSelected && <GeneralInformation/>}
                {!tabSelected && !generalSelected && children}
            </AppTab>
            {/* <ObjectCategoryView/> */}
        </div>
    );
}