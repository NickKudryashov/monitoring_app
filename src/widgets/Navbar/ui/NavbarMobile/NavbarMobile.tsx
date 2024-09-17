import classNames from "@/shared/lib/classNames/classNames";
import cls from "./NavbarMobile.module.scss";
import LogoIcon from "@/shared/assets/icons/NavbarMobileLogoIcon.svg";
import { PropsWithChildren, useCallback, useState } from "react";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserName } from "@/entities/user";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import MenuIcon from "@/shared/assets/icons/NavbarMobileMenuIcon.svg";
import ProfileIcon from "@/shared/assets/icons/NavbarMobileProfileIcon.svg";
import EventsIcon from "@/shared/assets/icons/NavbarMobileEventsIcon.svg";
import MessageIcon from "@/shared/assets/icons/NavbarMobileMessageIcon.svg";
import { NavbarMenu } from "../NavbarMenu/NavbarMenu";

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
    const navigate = useNavigate();

    const toggleMenuHandler = useCallback(() => {
        setShowMenu((prev) => !prev);
    }, []);

    const closeMenuHandler = useCallback(() => {
        setShowMenu(false);
    }, []);

    return (
        <HFlexBox
            height="35px"
            className={classNames(cls.Navbar, {}, [className])}
            align="space-around"
            alignItems="center"
        >
            <VFlexBox
                alignItems="center"
                height="fit-content"
                width="fit-content"
            >
                <p>МЕНЮ</p>
                <MenuIcon
                    onClick={toggleMenuHandler}
                    className={cls.menuIcon}
                />
            </VFlexBox>
            <VFlexBox
                alignItems="center"
                height="fit-content"
                width="fit-content"
            >
                <p>Тип компании</p>
                <p>Название компании</p>
            </VFlexBox>
            <LogoIcon />
            <VFlexBox
                alignItems="center"
                height="fit-content"
                width="fit-content"
            >
                <p>{email}</p>
                <p>Должность</p>
            </VFlexBox>
            <MessageIcon />
            <EventsIcon />
            <ProfileIcon />
            {showMenu && <NavbarMenu onClose={closeMenuHandler} />}
        </HFlexBox>
    );
}
