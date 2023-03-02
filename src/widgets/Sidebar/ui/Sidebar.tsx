import classNames from "shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import AddCategoryIcon from "shared/assets/icons/addFolderIcon.svg";
import AddHeatCounter from "shared/assets/icons/addHeatCounterIcon.svg";
import AddObjectIcon from "shared/assets/icons/addObjectIcon.svg";
import { PropsWithChildren, useCallback, useState } from "react";
import { AddObject } from "features/AddObject";
import { AddHeatDevice } from "features/AddHeatDevice";
import { AddCategory } from "features/AddCategory";

interface SidebarProps {
 className?: string;
}

export function Sidebar(props: PropsWithChildren<SidebarProps>) {
    const { className } = props;
    const [collapsed,setCollapsed] = useState(true);
    const [categoryFormOpened,setCategoryFormOpened] = useState(false);
    const [objectFormOpened,setObjectFormOpened] = useState(false);
    const [heatDeviceFormOpened,setHeatDeviceFormOpened] = useState(false);

    const acceptCategory = useCallback(() => {
        setCategoryFormOpened(false);
    },[]);
    const acceptObject = useCallback(() => {
        setObjectFormOpened(false);
    },[]);
    const acceptHeatDevice = useCallback(() => {
        setHeatDeviceFormOpened(false);
    },[]);
    const onToggle = ()=>{
        setCollapsed(prev=>!prev);
    };
    return (
        <div className={classNames(cls.Sidebar,{ [cls.collapsed]: collapsed },[className])}>
            <AddCategory onClose={acceptCategory} isOpen={categoryFormOpened}/>
            <AddObject onClose={acceptObject} isOpen={objectFormOpened}/>
            <AddHeatDevice onClose={acceptHeatDevice} isOpen={heatDeviceFormOpened}/>
            <button className={cls.collapseBtn} onClick={onToggle}>{collapsed ? ">" : "<"}</button>
            <div className={cls.items}>
                <AddCategoryIcon fill={"white"} className={cls.icon} onClick={()=>setCategoryFormOpened(true)}/>
                <AddObjectIcon className={cls.icon} onClick={()=>setObjectFormOpened(true)}/>
                <AddHeatCounter className={cls.icon} onClick={()=>setHeatDeviceFormOpened(true)}/>
            </div>
        </div>
    );
}