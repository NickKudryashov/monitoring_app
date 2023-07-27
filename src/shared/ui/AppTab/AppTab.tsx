import classNames from "shared/lib/classNames/classNames";
import cls from "./AppTab.module.scss";

import { PropsWithChildren, memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";


//Разобраться с any

export enum AppTabThemes {
    AUTH="auth",
    INNER="inner",
    GREYBTNS="shadow_btn"
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

const checkUrl = (path:string)=>{
    const urlList = path.split("/");
    // console.log(urlList);
    if (urlList.includes(RoutePathAuth.administration.slice(1,-1)) ||
    urlList.includes(RoutePathAuth.general.slice(1,-1)) ||
    urlList.includes(RoutePathAuth.mock.slice(1,-1)) 
    ){
        return true;
    }
    else {
        return false;
    }
};

export const  AppTab = memo((props: PropsWithChildren<AppTabProps>) => {
    const { className,tabs,theme=AppTabThemes.AUTH,children,selected,onSaveSelecting,getSelected,initialIndex=0 } = props;
    const [activeTab,setActiveTab] = useState<number>(getSelected());
    const navigate = useNavigate();
    // console.log("Таб номер:",activeTab);
    const mods = {
        [cls.active]:false
    };

    const tabFlag = checkUrl(useLocation().pathname);
    if (!tabFlag) {
        onSaveSelecting(-1);
    }
    // console.log(tabFlag);
    useEffect(()=>{
        setActiveTab(getSelected());
        // return ()=>{
        //     onSaveSelecting(-1);
            
        // };
    },[getSelected, onSaveSelecting, tabFlag]);

    const tabClickHandler = (index:number) => {
        setActiveTab(index);
        onSaveSelecting(index);
        // setTabSelected(true);
        if (index===5){
            navigate(RoutePathAuth.administration);
        }
        if (index>=1 && index<=4) {
            navigate(RoutePathAuth.mock);
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
});
