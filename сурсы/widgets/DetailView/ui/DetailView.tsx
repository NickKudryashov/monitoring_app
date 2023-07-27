import classNames from "shared/lib/classNames/classNames";
import cls from "./DetailView.module.scss";

import { PropsWithChildren, ReactNode, useCallback, useState } from "react";
import { CategoryCard, categorySlice } from "entities/Category";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { AppTab } from "shared/ui/AppTab/AppTab";
import { GeneralInformation } from "features/GeneralInformation";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";
import { useAppDispatch } from "shared/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";

interface DetailViewProps {
 className?: string;
 children?:ReactNode;
 tabSelected?:boolean;
 generalSelected?:boolean;
 setTabSelected?:(val:boolean)=>void;
 setGeneralSelected?:(val:boolean)=>void;
}
const GENERALTABSELECTEDKEY = "main_tab_selected";
export function DetailView(props: DetailViewProps) {
    const { className,children,setTabSelected,tabSelected,generalSelected,setGeneralSelected } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    if (generalSelected && tabSelected) {
        setTabSelected(false);
    }

    const tabHandler = useCallback((val:boolean)=> {
        setTabSelected(val);
        setGeneralSelected(false);
    },[setGeneralSelected, setTabSelected]);


    const saveSelecting = useCallback((index:number)=>{
        localStorage.setItem(GENERALTABSELECTEDKEY,String(index));
        if (index===0){
            navigate(RoutePathAuth.general);
        }
    },[navigate]);
    const getSelecting = useCallback(()=>{
        const index = localStorage.getItem(GENERALTABSELECTEDKEY) || 0;
        return Number(index);
        
    },[]);

    return (
        <div className={classNames(cls.DetailView,{},[className])}>
            <AppTab
                selected = {tabSelected} 
                setTabSelected = {tabHandler}
                getSelected={getSelecting}
                onSaveSelecting={saveSelecting}
                tabs={
                    [
                        // {name:"Общее",index:0,Content:GeneralInformation},
                        {name:"Общее",index:0,Content:GeneralInformation},
                        {name:"События",index:1,Content: MockComponent},
                        {name:"Объекты на карте",index:2,Content:MockComponent},
                        {name:"Архивы",index:3,Content:MockComponent},
                        {name:"Обслуживание",index:4,Content:MockComponent},
                        {name:"Администрирование",index:5,Content:MockComponent},
                        // {name:"Главная",index:5,Content:MockComponent},
                    ]}
            >
                <div className={cls.expandable}>
                    {generalSelected && <GeneralInformation/>}
                    {!tabSelected && !generalSelected && children}
                </div>
            </AppTab>
            {/* <ObjectCategoryView/> */}
        </div>
    );
}