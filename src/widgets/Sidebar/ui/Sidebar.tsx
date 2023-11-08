import classNames from "shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import AddCategoryIcon from "shared/assets/icons/addFolderIcon.svg";
import AddHeatCounter from "shared/assets/icons/addHeatCounterIcon.svg";
import AddObjectIcon from "shared/assets/icons/addObjectIcon.svg";
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { AddObject } from "features/AddObject";
import { AddHeatDevice } from "features/AddHeatDevice";
import { AddCategory } from "features/AddCategory";
import AdminIcon from "shared/assets/icons/SidebarAdminIcon.svg";
import AdressIcon from "shared/assets/icons/SidebarAdressIcon.svg";
import AnaliticIcon from "shared/assets/icons/SidebarAnaliticsIcon.svg";
import ArchivesIcon from "shared/assets/icons/SidebarArchivesIcon.svg";
import EventIcon from "shared/assets/icons/SidebarEventIcon.svg";
import MapIcon from "shared/assets/icons/SidebarMapIcon.svg";
import PlannedWorkIcon from "shared/assets/icons/SidebarPlannedWorkIcon.svg";
import SettingsIcon from "shared/assets/icons/SidebarSettingsIcon.svg";
import SystemsIcon from "shared/assets/icons/SidebarSystemsIcon.svg";
import TasksIcon from "shared/assets/icons/SidebarTasksIcon.svg";
import TicketsIcon from "shared/assets/icons/SidebarTicketsIcon.svg";
import UserObjectIcon from "shared/assets/icons/SidebarUserObjectIcon.svg";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { useHover } from "shared/hooks/useHover";
import { useDebounce } from "shared/hooks/useDebounce";

interface SidebarProps {
 className?: string;
}

export function Sidebar(props: PropsWithChildren<SidebarProps>) {
    const { className } = props;
    const devRef = useRef<HTMLDivElement>();
    const collapsedFact = useHover(devRef);
    const [collapsed,setCollapsed] = useState(true);
    const [categoryFormOpened,setCategoryFormOpened] = useState(false);
    const [objectFormOpened,setObjectFormOpened] = useState(false);
    const [heatDeviceFormOpened,setHeatDeviceFormOpened] = useState(false);
    const toggle = useDebounce((collapsedFact)=>{setCollapsed(collapsedFact);},1000);
    useEffect(()=>{
        toggle(!collapsedFact);
    },[collapsedFact]);
    const navigate = useNavigate();
    const acceptCategory = useCallback(() => {
        setCategoryFormOpened(false);
    },[]);
    const acceptObject = useCallback(() => {
        setObjectFormOpened(false);
    },[]);
    const acceptHeatDevice = useCallback(() => {
        setHeatDeviceFormOpened(false);
    },[]);
    return (
        <div ref={devRef}  className={classNames(cls.Sidebar,{ [cls.collapsed]: collapsed },[className])}>
            <AddCategory onClose={acceptCategory} isOpen={categoryFormOpened}/>
            <AddObject onClose={acceptObject} isOpen={objectFormOpened}/>
            <AddHeatDevice onClose={acceptHeatDevice} isOpen={heatDeviceFormOpened}/>
            <div className={cls.items} onClick={(e)=>e.stopPropagation()}>
                {/* <AddCategoryIcon fill={"white"} className={cls.icon} onClick={()=>setCategoryFormOpened(true)}/>
                <AddObjectIcon className={cls.icon} onClick={()=>setObjectFormOpened(true)}/>
                <AddHeatCounter className={cls.icon} onClick={()=>setHeatDeviceFormOpened(true)}/> */}
                <SidebarItem onClick={()=>navigate(RoutePathAuth.category+"1")} Icon={UserObjectIcon} minimized={collapsed} annotation="ОБЪЕКТЫ"/>
                <SidebarItem onClick={()=>navigate(RoutePathAuth.detail_objects)} Icon={AdressIcon} minimized={collapsed} annotation="АДРЕСА"/>
                <SidebarItem Icon={EventIcon} minimized={collapsed} annotation="СОБЫТИЯ"/>
                <SidebarItem Icon={TasksIcon} minimized={collapsed} annotation="ЗАДАЧИ"/>
                <SidebarItem onClick={()=>navigate(RoutePathAuth.administration)} Icon={AdminIcon} minimized={collapsed} annotation="АДМИН"/>
                <SidebarItem onClick={()=>navigate(RoutePathAuth.map)} Icon={MapIcon} minimized={collapsed} annotation="КАРТЫ"/>
                <SidebarItem Icon={SettingsIcon} minimized={collapsed} annotation="НАСТРОЙКИ"/>
                <SidebarItem Icon={AnaliticIcon} minimized={collapsed} annotation="АНАЛИТИКА"/>
                <SidebarItem Icon={TicketsIcon} minimized={collapsed} annotation="ЗАЯВКИ"/>
                <SidebarItem Icon={PlannedWorkIcon} minimized={collapsed} annotation="ПЛАНОВЫЕ РАБОТЫ"/>
                <SidebarItem Icon={ArchivesIcon} minimized={collapsed} annotation="АРХИВЫ"/>
                <SidebarItem Icon={SystemsIcon} minimized={collapsed} annotation="СИСТЕМЫ"/>
            </div>

        </div>
    );
}

interface SidebarItemProps {
    Icon:React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    annotation:string;
    minimized:boolean;
    onClick?:()=>void;
}

const SidebarItem = (props:SidebarItemProps)=>{
    const {annotation,Icon,minimized,onClick} = props;
    const mods = {
        [cls.sidebarItemMinimized]:minimized,
    };
    const textMods = {
        [cls.annotationCollapsed]:minimized

    };
    return (
        <div onClick={onClick ? onClick : ()=>{}} className={classNames(cls.sidebarItem,mods,[])}>
            <Icon className={cls.icon}/>
            {!minimized && <p className={classNames(cls.annotation,textMods,[])}>{annotation}</p>}
        </div>
    );
}; 