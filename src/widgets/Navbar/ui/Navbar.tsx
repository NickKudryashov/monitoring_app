import classNames from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

import { PropsWithChildren, useState } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { userSlice } from "entities/user/Store/authReducer";
import { Modal } from "shared/ui/Modal/Modal";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { getArchivesEvents } from "entities/Heatcounters";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import LogoIcon from "shared/assets/icons/LogoIcon.svg";
import EventIcon from "shared/assets/icons/EventsIcon.svg";
import ProfileIcon from "shared/assets/icons/ProfileIcon.svg";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { useNavigate } from "react-router-dom";
import { RoutePathPublic } from "shared/config/RouteConfig/RouteConfig";
import SearchIcon from "shared/assets/icons/NavbarSearchIcon.svg";
interface NavbarProps {
 className?: string;
 isAuth?:boolean;
}

export function Navbar(props: PropsWithChildren<NavbarProps>) {
    const { className,isAuth=true } = props;
    const email = useSelector((state:StateSchema)=>state.user.userdata?.name);
    const {isLoading:eventsIsLoading,data:archiveEventsData,refetch:refetchEvents} = getArchivesEvents();
    const [showEvents,setShowEvents] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const au = new Audio("/leave.m4a");
    // au.muted = true;
    // const onExitHover = () =>au.play();
    // const onExitHover1 = () =>au.pause();
    return (
        <div className={classNames(cls.Navbar,{},[className])}>

            <div className={cls.blocks_group}>
                <div className={cls.logo}>
                    <LogoIcon className={cls.logoIcon}/>
                    <p className={cls.logoText}>АЛВИК СЕРВИС</p>
                </div>
                {isAuth && <div className={cls.textInfo}>
                    <div className={cls.vTextBox}>
                        <p>Тип компании</p>
                        <p>Название компании</p>
                    </div>
                    <div className={cls.vTextBox}>
                        <p>{email}</p>
                        <p>Должность</p>
                    </div>
                </div>}
                <div className={cls.navbarPanel}>
                    {isAuth && 
                    <div className={cls.inpWrap}>
                        <SearchIcon className={cls.search}/>
                        <AppInput theme={InputThemes.DESIGNED_PRIMARY} placeholder=""/>
                    </div>
                    }
                    {!isAuth && <AppButon
                        theme={AppButtonTheme.DESIGNED_OUTLINE}
                        className={classNames(cls.blocks,{},[cls.btns])}
                        onClick={()=>navigate(RoutePathPublic.reg)}
                    >
                        Регистрация
                    </AppButon>}
                    <ProfileIcon width={"30px"} height={"30px"}/>
                    {isAuth && <EventIcon width={"30px"} height={"30px"} onClick={()=>setShowEvents(prev=>!prev)}/>}
                    {isAuth && 
                    <AppButon
                        theme={AppButtonTheme.DESIGNED_OUTLINE}
                        onClick={()=>dispatch(userSlice.actions.logout())}
                        className={classNames(cls.blocks,{},[cls.btns])}
                        // onMouseEnter={onExitHover}
                        // onMouseLeave={onExitHover1}
                    >
                        выход
                    </AppButon>}
                    
                    {!isAuth && <AppButon
                        theme={AppButtonTheme.DESIGNED_OUTLINE}
                        className={classNames(cls.blocks,{},[cls.btns])}
                        onClick={()=>navigate(RoutePathPublic.auth)}
                    >
                        вход
                    </AppButon>}
                </div>
                {/* <AddAutoDevice isOpen={autoDevFormOpened} onClose={acceptAutoDevice}/> */}
                <Modal isOpen={showEvents} onClose={()=>setShowEvents(false)}  >
                    {
                        <div className={cls.modalWin}>
                            {   
                                archiveEventsData?.map(
                                    el=>
                                        <p key={el.id}>{`${el.event_datetime} ${el.system} ${el.message}`}</p>
                                )                       
                            }
                            {(archiveEventsData===undefined || archiveEventsData?.length===0)&&
                            <p>События отсутствуют</p>
                            }
                        </div>
                    }
                
                </Modal>
                
                
            </div>
        </div>
    );
}