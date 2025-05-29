import classNames from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'

import { PropsWithChildren, useState } from 'react'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { userSlice } from '@/entities/user/Store/authReducer'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useSelector } from 'react-redux'
import { AppButon, AppButtonTheme } from '@/shared/ui/AppButton/AppButton'
import LogoIcon from '@/shared/assets/icons/LogoIcon.svg'
import EventIcon from '@/shared/assets/icons/EventsIcon.svg'
import CrossIcon from '@/shared/assets/icons/CrossIcon.svg'
import ProfileIcon from '@/shared/assets/icons/ProfileIcon.svg'
import { AppInput, InputThemes } from '@/shared/ui/AppInput/AppInput'
import { useNavigate } from 'react-router-dom'
import { RoutePathPublic } from '@/shared/config/RouteConfig/RouteConfig'
import SearchIcon from '@/shared/assets/icons/NavbarSearchIcon.svg'
import { VFlexBox } from '@/shared/ui/FlexBox/VFlexBox/VFlexBox'
import { AllEventsView } from '@/entities/ArchiveEvent'
import { navbarActions } from '../../model/slice/slice'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { getUserName } from '@/entities/user'
export interface NavbarProps {
    className?: string
    isAuth?: boolean
}

export function Navbar(props: PropsWithChildren<NavbarProps>) {
    const { className = '', isAuth = true } = props
    const email = useSelector(getUserName)
    const [searchVal, setSearchVal] = useState('')
    const [showEvents, setShowEvents] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const setState = () => {
        dispatch(navbarActions.setValue(searchVal))
    }
    const debouncedSetState = useDebounce(setState, 1000)
    const onSearchEnterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchVal(e.target.value)
        debouncedSetState()
    }
    const cancelSearch = () => {
        dispatch(navbarActions.clearValue())
        setSearchVal('')
    }
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.blocks_group}>
                <div className={cls.logo}>
                    <LogoIcon className={cls.logoIcon} />
                    <VFlexBox width='70%' align='center'>
                        <p className={cls.logoText}>АЛВИК СЕРВИС</p>
                    </VFlexBox>
                </div>
                {isAuth && (
                    <div className={cls.textInfo}>
                        <div className={cls.vTextBox}>
                            <p>Тип компании</p>
                            <p>Название компании</p>
                        </div>
                        <div className={cls.vTextBox}>
                            <p>{email}</p>
                            <p>Должность</p>
                        </div>
                    </div>
                )}
                <div className={cls.navbarPanel}>
                    {isAuth && (
                        <div className={cls.inpWrap}>
                            <SearchIcon className={cls.search} />
                            <AppInput
                                value={searchVal}
                                onChange={onSearchEnterHandler}
                                theme={InputThemes.DESIGNED_PRIMARY}
                                placeholder=''
                            />
                            <CrossIcon className={cls.crossIcon} onClick={cancelSearch} />
                        </div>
                    )}
                    {!isAuth && (
                        <AppButon
                            theme={AppButtonTheme.DESIGNED_OUTLINE}
                            className={classNames(cls.blocks, {}, [cls.btns])}
                            onClick={() => navigate(RoutePathPublic.reg)}
                        >
                            Регистрация
                        </AppButon>
                    )}
                    <ProfileIcon width={'30px'} height={'30px'} />
                    {isAuth && (
                        <EventIcon
                            width={'30px'}
                            height={'30px'}
                            onClick={() => setShowEvents((prev) => !prev)}
                        />
                    )}
                    {isAuth && (
                        <AppButon
                            theme={AppButtonTheme.DESIGNED_OUTLINE}
                            onClick={() => {
                                dispatch(userSlice.actions.logout())
                                navigate('/')
                            }}
                            className={classNames(cls.blocks, {}, [cls.btns])}
                        >
                            выход
                        </AppButon>
                    )}

                    {!isAuth && (
                        <AppButon
                            theme={AppButtonTheme.DESIGNED_OUTLINE}
                            className={classNames(cls.blocks, {}, [cls.btns])}
                            onClick={() => navigate(RoutePathPublic.auth)}
                        >
                            вход
                        </AppButon>
                    )}
                </div>
                <Modal isOpen={showEvents} onClose={() => setShowEvents(false)}>
                    {showEvents && <AllEventsView />}
                </Modal>
            </div>
        </div>
    )
}
