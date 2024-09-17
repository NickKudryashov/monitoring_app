import classNames from "@/shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss";
import {
    MutableRefObject,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import AdminIcon from "@/shared/assets/icons/SidebarAdminIcon.svg";
import AdressIcon from "@/shared/assets/icons/SidebarAdressIcon.svg";
import AnaliticIcon from "@/shared/assets/icons/SidebarAnaliticsIcon.svg";
import ArchivesIcon from "@/shared/assets/icons/SidebarArchivesIcon.svg";
import EventIcon from "@/shared/assets/icons/SidebarEventIcon.svg";
import MapIcon from "@/shared/assets/icons/SidebarMapIcon.svg";
import PlannedWorkIcon from "@/shared/assets/icons/SidebarPlannedWorkIcon.svg";
import SettingsIcon from "@/shared/assets/icons/SidebarSettingsIcon.svg";
import SystemsIcon from "@/shared/assets/icons/SidebarSystemsIcon.svg";
import TasksIcon from "@/shared/assets/icons/SidebarTasksIcon.svg";
import TicketsIcon from "@/shared/assets/icons/SidebarTicketsIcon.svg";
import UserObjectIcon from "@/shared/assets/icons/SidebarUserObjectIcon.svg";
import VideoIcon from "@/shared/assets/icons/SidebarVideoIcon.svg";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "@/shared/config/RouteConfig/RouteConfig";
import { useHover } from "@/shared/hooks/useHover";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";

interface SidebarProps {
    className?: string;
}

export function Sidebar(props: PropsWithChildren<SidebarProps>) {
    const { className = "" } = props;
    const devRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
    const collapsedFact = useHover(devRef);
    const [collapsed, setCollapsed] = useState(true);
    const isMobile = useMobilDeviceDetect();
    const toggle = useDebounce((collapsedFact) => {
        setCollapsed(collapsedFact);
    }, 1000);
    useEffect(() => {
        toggle(!collapsedFact);
    }, [collapsedFact]);
    const navigate = useNavigate();
    if (isMobile) {
        return null;
    }
    return (
        <div
            ref={devRef}
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            <div className={cls.items} onClick={(e) => e.stopPropagation()}>
                <SidebarItem
                    onClick={() => navigate(RoutePathAuth.category)}
                    Icon={UserObjectIcon}
                    minimized={collapsed}
                    annotation="ОБЪЕКТЫ"
                />
                <SidebarItem
                    onClick={() => navigate(RoutePathAuth.detail_objects)}
                    Icon={AdressIcon}
                    minimized={collapsed}
                    annotation="АДРЕСА"
                />
                <SidebarItem
                    Icon={EventIcon}
                    minimized={collapsed}
                    disabled
                    annotation="СОБЫТИЯ"
                />
                <SidebarItem
                    Icon={TasksIcon}
                    minimized={collapsed}
                    disabled
                    annotation="ЗАДАЧИ"
                />
                <SidebarItem
                    onClick={() => navigate(RoutePathAuth.administration)}
                    Icon={AdminIcon}
                    minimized={collapsed}
                    annotation="АДМИН"
                />
                <SidebarItem
                    onClick={() => navigate(RoutePathAuth.map)}
                    Icon={MapIcon}
                    minimized={collapsed}
                    annotation="КАРТЫ"
                />
                <SidebarItem
                    onClick={() => navigate(RoutePathAuth.settings)}
                    Icon={SettingsIcon}
                    minimized={collapsed}
                    annotation="НАСТРОЙКИ"
                />
                <SidebarItem
                    Icon={AnaliticIcon}
                    minimized={collapsed}
                    disabled
                    annotation="АНАЛИТИКА"
                />
                <SidebarItem
                    Icon={TicketsIcon}
                    minimized={collapsed}
                    disabled
                    annotation="ЗАЯВКИ"
                />
                <SidebarItem
                    Icon={PlannedWorkIcon}
                    minimized={collapsed}
                    disabled
                    annotation="ПЛАНОВЫЕ РАБОТЫ"
                />
                <SidebarItem
                    Icon={ArchivesIcon}
                    minimized={collapsed}
                    disabled
                    annotation="АРХИВЫ"
                />
                <SidebarItem
                    Icon={SystemsIcon}
                    minimized={collapsed}
                    disabled
                    annotation="СИСТЕМЫ"
                />
                <SidebarItem
                    Icon={VideoIcon}
                    minimized={collapsed}
                    disabled
                    annotation="ВИДЕО"
                />
            </div>
        </div>
    );
}

interface SidebarItemProps {
    Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    annotation: string;
    minimized: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const SidebarItem = (props: SidebarItemProps) => {
    const { annotation, Icon, minimized, disabled = false, onClick } = props;
    const mods = {
        [cls.sidebarItemMinimized]: minimized,
        [cls.sidebarItemDisabled]: disabled,
        [cls.icon]: !disabled,
    };
    const textMods = {
        [cls.annotationCollapsed]: minimized,
        [cls.sidebarItemDisabled]: disabled,
    };
    return (
        <div
            onClick={onClick ? onClick : () => {}}
            className={classNames(cls.sidebarItem, mods, [])}
        >
            <Icon className={classNames("", mods, [])} />
            {!minimized && (
                <p className={classNames(cls.annotation, textMods, [])}>
                    {annotation}
                </p>
            )}
        </div>
    );
};
