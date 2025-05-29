import classNames from '@/shared/lib/classNames/classNames'
import cls from './DefaultAuth.module.scss'

import { PropsWithChildren, ReactNode } from 'react'
import { getIsAuth } from '@/entities/user'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RoutePathAuth } from '@/shared/config/RouteConfig/RouteConfig'
import { Flex, Typography } from 'antd'
import { ADDON_COLOR } from '@/shared/newUi/styles'
import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { StateSchema } from '@/app/providers/StoreProvider/config/stateSchema'

interface DefaultAuthProps {
    className?: string
    title: string
    children?: ReactNode
    authSelected: boolean
    changeMode: (arg: boolean) => void
}

export function DefaultAuth(props: PropsWithChildren<DefaultAuthProps>) {
    const { className = '', title, children, authSelected, changeMode } = props
    const isAuth = useSelector(getIsAuth)
    const active = useSelector((state: StateSchema) => state.user.is_active)
    const isMobile = useMobilDeviceDetect()
    const navigate = useNavigate()
    if (isAuth && active) {
        navigate(RoutePathAuth.main)
    }
    return (
        <>
            <Flex
                className={classNames(cls.mainLayout, { [cls.mobileBackground]: isMobile }, [
                    className,
                    cls.mainLayoutAnim,
                ])}
                justify={isMobile ? 'center' : 'space-around'}
                vertical
                gap={'small'}
                align='center'
            >
                <Flex
                    justify='center'
                    align={isMobile ? 'end' : 'end'}
                    style={{
                        height: isMobile ? '5%' : '15%',
                        width: '100%',
                    }}
                >
                    <Typography.Title
                        level={isMobile ? 4 : 3}
                        style={{
                            textAlign: 'center',
                            color: isMobile ? 'white' : 'black',
                            userSelect: 'none',
                        }}
                    >
                        {title}
                    </Typography.Title>
                </Flex>
                {children}
                <Typography.Link
                    onClick={() => changeMode(!authSelected)}
                    style={{
                        justifySelf: 'center',
                        alignSelf: 'center',
                        borderBottom: `1px solid ${ADDON_COLOR}`,
                        color: ADDON_COLOR,
                        marginBottom: '8px',
                    }}
                >
                    {authSelected ? 'Регистрация' : 'Авторизация'}
                </Typography.Link>
            </Flex>
        </>
    )
}
