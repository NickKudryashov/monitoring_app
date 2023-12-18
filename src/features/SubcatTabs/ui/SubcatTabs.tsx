import { ReactElement } from "react";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import cls from "./SubcatTabs.module.scss";
import classNames from "shared/lib/classNames/classNames";

interface SubcatTabsProps {
    onTabSelect:(index:number)=>void;
    selectedTab:number;
}


export const SubcatTabs = (props:SubcatTabsProps):ReactElement=>{
    const {onTabSelect,selectedTab} = props;
    return(
        <HFlexBox className={cls.tableHeadersFlexbox}>
            <div onClick={()=>onTabSelect(1)} className={classNames(cls.tabHeaderButton,{[cls.selectedTab]:selectedTab===1},[cls.tabLeftButton,])}>
                <p>МНЕМОСХЕМА</p>
            </div>
            <div onClick={()=>onTabSelect(2)} className={classNames(cls.tabHeaderButton,{[cls.selectedTab]:selectedTab===2},[])}>
                <p>ПАРАМЕТРЫ</p>
            </div>
            <div onClick={()=>onTabSelect(3)} className={classNames(cls.tabHeaderButton,{[cls.selectedTab]:selectedTab===3},[])}>
                <p>АРХИВЫ</p>
            </div>
            <div onClick={()=>onTabSelect(4)} className={classNames(cls.tabHeaderButton,{[cls.selectedTab]:selectedTab===4},[cls.tabRightButton,])}>
                <p>ГРАФИКИ</p>
            </div>
        </HFlexBox>
    );
};