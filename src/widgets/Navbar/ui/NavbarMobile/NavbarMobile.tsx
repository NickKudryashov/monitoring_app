import classNames from "@/shared/lib/classNames/classNames";
import cls from "./NavbarMobile.module.scss";
import LogoIcon from "@/shared/assets/icons/NavbarMobileLogoIcon.svg";
import { PropsWithChildren, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserName, useUserActions } from "@/entities/user";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import MenuIcon from "@/shared/assets/icons/NavbarMobileMenuIcon.svg";
import EventsIcon from "@/shared/assets/icons/NavbarMobileEventsIcon.svg";
import { NavbarMenu } from "../NavbarMenu/NavbarMenu";
import ExitIcon from "@/shared/assets/icons/ExitIcon.svg";
import { useAppDispatch } from "@/shared/hooks/hooks";
interface NavbarProps {
    className?: string;
    isAuth?: boolean;
}
// меню + черточки (вфлекс)
// компания
// лого
// юзернейм
// иконка сообщения
// иконка уведомлений
// иконка профиля

export function MobileNavbar(props: PropsWithChildren<NavbarProps>) {
    const { className = "", isAuth = true } = props;
    const email = useSelector(getUserName);
    const [showEvents, setShowEvents] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { logout } = useUserActions();
    const toggleMenuHandler = useCallback(() => {
        setShowMenu((prev) => !prev);
    }, []);

    const closeMenuHandler = useCallback(() => {
        setShowMenu(false);
    }, []);

    return (
        <HFlexBox
            className={classNames(cls.Navbar, {}, [className])}
            align="space-around"
            alignItems="center"
            height="40px"
        >
            <VFlexBox
                alignItems="center"
                height="fit-content"
                width="fit-content"
                onClick={toggleMenuHandler}
            >
                <p>МЕНЮ</p>
                <MenuIcon className={cls.menuIcon} />
            </VFlexBox>
            <VFlexBox
                alignItems="center"
                height="fit-content"
                width="fit-content"
            >
                <p>Тип компании</p>
                <p>Название компании</p>
            </VFlexBox>
            <LogoIcon className={cls.logoIcon} />
            <VFlexBox
                alignItems="center"
                height="fit-content"
                width="fit-content"
            >
                <p>{email}</p>
                <p>Должность</p>
            </VFlexBox>
            <EventsIcon />
            <ExitIcon onClick={() => logout()} className={cls.icon} />
            {showMenu && <NavbarMenu onClose={closeMenuHandler} />}
        </HFlexBox>
    );
}
