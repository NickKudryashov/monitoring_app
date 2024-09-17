import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import AdressIcon from "@/shared/assets/icons/SidebarMobileIconAddressIcon.svg";
import EventIcon from "@/shared/assets/icons/SidebarMobileIconEventsIcon.svg";
import TasksIcon from "@/shared/assets/icons/SidebarMobileIconTasksIcon.svg";
import PlannedWorkIcon from "@/shared/assets/icons/SidebarMobileIconPlannedIcon.svg";
import SettingsIcon from "@/shared/assets/icons/SidebarMobileIconSettingsIcon.svg";
import TicketsIcon from "@/shared/assets/icons/SidebarMobileIconTicketsIcon.svg";
import UserObjectIcon from "@/shared/assets/icons/SidebarMobileIconObjectIcon.svg";
import VideoIcon from "@/shared/assets/icons/SidebarMobileIconVideoIcon.svg";
import { Link } from "react-router-dom";
import { RoutePathAuth } from "@/shared/config/RouteConfig/RouteConfig";
import cls from "./NavbarMenu.module.scss";
import classNames from "@/shared/lib/classNames/classNames";
import { memo } from "react";

export const NavbarMenu = memo((props: { onClose: () => void }) => {
    const { onClose } = props;
    return (
        <VFlexBox width="33%" className={cls.navbarMenu}>
            <Link
                className={cls.link}
                to={RoutePathAuth.category}
                onClick={onClose}
            >
                <HFlexBox
                    className={classNames(cls.menuRow, {}, [cls.firstRow])}
                >
                    <UserObjectIcon className={cls.icon} />
                    <p>Объекты</p>
                </HFlexBox>
            </Link>

            <Link
                className={cls.link}
                to={RoutePathAuth.detail_objects}
                onClick={onClose}
            >
                <HFlexBox className={cls.menuRow}>
                    <AdressIcon />
                    <p>Адреса</p>
                </HFlexBox>
            </Link>
            <HFlexBox className={cls.menuRow}>
                <EventIcon />
                <p>События</p>
            </HFlexBox>
            <HFlexBox className={cls.menuRow}>
                <TasksIcon />
                <p>Задачи</p>
            </HFlexBox>
            <HFlexBox className={cls.menuRow}>
                <SettingsIcon />
                <p>Настройки</p>
            </HFlexBox>
            <HFlexBox className={cls.menuRow}>
                <TicketsIcon />
                <p>Заявки</p>
            </HFlexBox>
            <HFlexBox className={cls.menuRow}>
                <PlannedWorkIcon />
                <p>Плановые работы</p>
            </HFlexBox>
            <HFlexBox className={cls.menuRow}>
                <VideoIcon />
                <p>Видеокамеры</p>
            </HFlexBox>
        </VFlexBox>
    );
});

NavbarMenu.displayName = "NavbarMenu";
