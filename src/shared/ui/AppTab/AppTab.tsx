import classNames from "shared/lib/classNames/classNames";
import cls from "./AppTab.module.scss";

import { PropsWithChildren, useState } from "react";


//Разобраться с any

export enum AppTabThemes {
    AUTH="auth",
}


interface AppTabProps {
 className?: string;
 theme?:AppTabThemes;
 tabs:any[];
 selected?:boolean;
 setTabSelected?:(val:boolean)=>void;

}

export function AppTab(props: PropsWithChildren<AppTabProps>) {
    const { className,tabs,theme=AppTabThemes.AUTH,children,selected,setTabSelected } = props;
    const [activeTab,setActiveTab] = useState<number>(0);
    const mods = {
        [cls.active]:false
    };

    const tabClickHandler = (index:number) => {
        setActiveTab(index);
        setTabSelected(true);
    };

    return (
        <div className={classNames(cls.AppTab,{},[className,cls[theme]])}>
 
            <div className={cls.container}>
                <div className={cls.buttons}>
                    {tabs.map(({name},index)=>
                        <button className={classNames("",{[cls.active]:(index===activeTab && selected)},[cls.tab])} key={index} onClick={()=>tabClickHandler(index)}>{name}</button>
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