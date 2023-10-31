import classNames from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

import { PropsWithChildren, useCallback, useState } from "react";
import { AddCategory } from "features/AddCategory";
import { AddObject } from "features/AddObject";
import { AddHeatDevice } from "features/AddHeatDevice";
import { useAppDispatch } from "shared/hooks/hooks";
import { userSlice } from "entities/user/Store/authReducer";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import DropdownIcon from "shared/assets/icons/dropdownIcon.svg";
import { Modal } from "shared/ui/Modal/Modal";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { AddElectroDevice } from "features/AddElectroDevice";
import { AddPumpDevice } from "features/AddPumpStationDevice";
import { AddAutoDevice } from "features/AddAutoDevice";
import { getArchivesEvents } from "entities/Heatcounters";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import LogoIcon from 'shared/assets/icons/LogoIcon.svg'
import EventIcon from 'shared/assets/icons/EventsIcon.svg'
import ProfileIcon from 'shared/assets/icons/ProfileIcon.svg'
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
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
    return (
        <div className={classNames(cls.Navbar,{},[className])}>

            <div className={cls.blocks_group}>
                <div className={cls.logo}>
                    <LogoIcon className={cls.logoIcon}/>
                    <p className={cls.logoText}>АЛВИК СЕРВИС</p>
                </div>
                {isAuth && <div className={cls.textInfo}>
                    <div className={cls.vTextBox}>
                        <p>ТИП КОМПАНИИ</p>
                        <p>НАЗВАНИЕ КОМПАНИИ</p>
                    </div>
                    <div className={cls.vTextBox}>
                        <p>{email}</p>
                        <p>ДОЛЖНОСТЬ</p>
                    </div>
                </div>}
                <div className={cls.navbarPanel}>
                    {isAuth && <AppInput theme={InputThemes.DESIGNED_PRIMARY} placeholder=""/>}
                    {!isAuth && <AppButon
                        theme={AppButtonTheme.DESIGNED_OUTLINE}
                        className={cls.blocks}>
                        Регистрация
                    </AppButon>}
                    <ProfileIcon/>
                    {isAuth && <EventIcon onClick={()=>setShowEvents(prev=>!prev)}/>}
                    {isAuth && 
                    <AppButon
                        theme={AppButtonTheme.DESIGNED_OUTLINE}
                        onClick={()=>dispatch(userSlice.actions.logout())}
                        className={cls.blocks}
                    >
                        Выход
                    </AppButon>}
                    
                    {!isAuth && <AppButon
                        theme={AppButtonTheme.DESIGNED_OUTLINE}
                        className={cls.blocks}>
                        Вход
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