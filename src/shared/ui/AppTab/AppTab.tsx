import classNames from "shared/lib/classNames/classNames";
import cls from "./AppTab.module.scss";

import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";


//Разобраться с any

export enum AppTabThemes {
    AUTH="auth",
    INNER="inner"
}


interface AppTabProps {
 className?: string;
 theme?:AppTabThemes;
 tabs:any[];
 initialIndex?:number,
 selected?:boolean;
 setTabSelected?:(val:boolean)=>void;
 onSaveSelecting?:(index:number)=>void;
 getSelected?:()=>number;

}

export function AppTab(props: PropsWithChildren<AppTabProps>) {
    const { className,tabs,theme=AppTabThemes.AUTH,children,selected,onSaveSelecting,getSelected,initialIndex=0 } = props;
    const [activeTab,setActiveTab] = useState<number>(getSelected());
    const navigate = useNavigate();
    const mods = {
        [cls.active]:false
    };

    useEffect(()=>{
        setActiveTab(getSelected());
        return ()=>{
            onSaveSelecting(-1);
        };
    },[getSelected, onSaveSelecting]);

    const tabClickHandler = (index:number) => {
        setActiveTab(index);
        onSaveSelecting(index);
        // setTabSelected(true);
        if (index===5){
            navigate(RoutePathAuth.administration);
        }

    };

    return (
        <div className={classNames(cls.AppTab,{},[className,cls[theme]])}>
 
            <div className={cls.container}>
                <div className={cls.buttons}>
                    {tabs.map(({name},index)=>
                        <button className={classNames("",{[cls.active]:(index===activeTab)},[cls.tab])} key={index} onClick={()=>tabClickHandler(index)}>{name}</button>
                    )}
                </div>
                
                <div className={cls.content}>
                    {!selected && children}
                    {selected && tabs.map(({Content},index)=>
                        <div key={index}>{index===activeTab && <Content/>}</div>)}
                </div>
            </div>

        </div>
    );
}