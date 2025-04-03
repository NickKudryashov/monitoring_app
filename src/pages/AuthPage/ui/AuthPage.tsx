import classNames, { Mods } from '@/shared/lib/classNames/classNames'
import cls from './AuthPage.module.scss'

import { useEffect, useMemo, useState, type PropsWithChildren, type ReactNode } from 'react'
import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { DefaultAuth } from '@/features/DefaultAuth/ui'
import { Flex } from 'antd'
import AuthBack from '@/shared/assets/icons/AuthBack.svg'
import { AuthForm } from '@/features/DefaultAuth/ui/AuthForm/AuthForm'
import { RegForm } from '@/features/DefaultAuth/ui/RegForm/RegForm'
import { AnimatePresence, AnimatePresenceProps, HTMLMotionProps, motion } from 'framer-motion'
interface AuthPageProps {
    className?: string
}

export function AuthPage(props: PropsWithChildren<AuthPageProps>) {
    const { className = '' } = props
    const isMobile = useMobilDeviceDetect()
    const [auth, setAuth] = useState(true)
    const title = useMemo(() => {
        return auth ? 'Авторизация' : 'Регистрация'
    }, [auth])
    return (
        <Flex
            data-testid='AuthPage'
            className={classNames(cls.AuthPage, {}, [className])}
            align='center'
            justify='center'
        >
            {!isMobile && (
                <Flex
                    justify='center'
                    align='center'
                    style={{ minWidth: '800px', width: '100%', height: '90%' }}
                >
                    <>
                        <BigField auth={auth}>
                            {auth && (
                                <DefaultAuth changeMode={setAuth} authSelected={auth} title={title}>
                                    <AuthForm />
                                </DefaultAuth>
                            )}
                        </BigField>
                        <SmallField auth={auth}>
                            {!auth && (
                                <DefaultAuth changeMode={setAuth} authSelected={auth} title={title}>
                                    <RegForm />
                                </DefaultAuth>
                            )}
                        </SmallField>
                    </>
                </Flex>
            )}
            {isMobile && (
                <Flex
                    className={classNames(
                        '',
                        {
                            [cls.mobileForm]: auth,
                            [cls.mobileRegForm]: !auth,
                        },
                        [],
                    )}
                >
                    <DefaultAuth changeMode={setAuth} authSelected={auth} title={title}>
                        {auth ? <AuthForm /> : <RegForm />}
                    </DefaultAuth>
                </Flex>
            )}
        </Flex>
    )
}
const SmallField = ({ children, auth }: { children?: ReactNode; auth: boolean }) => {
    return (
        <AnimatePresence>
            <Flex justify='center' align='center' className={classNames(cls.small, {}, [])}>
                {auth && (
                    <motion.div
                        exit={{ width: 0, height: 0 }}
                        key='auth1'
                        initial={{ height: '80%', width: '100%' }}
                        animate={{
                            height: '100%',
                            width: '100%',
                        }}
                        transition={{ ease: 'linear' }}
                    >
                        <Flex justify='center' align='center' className={cls.registerGradient}>
                            <AuthBack className={cls.logoIcon} />
                        </Flex>
                    </motion.div>
                )}
                {!auth && (
                    <motion.div
                        transition={{ ease: 'linear' }}
                        exit={{ width: 0, height: 0 }}
                        initial={{ height: '80%', width: '100%' }}
                        key='auth'
                        animate={{
                            height: '98%',
                            width: '100%',
                        }}
                    >
                        {children}
                    </motion.div>
                )}
            </Flex>
        </AnimatePresence>
    )
}

const BigField = ({ children, auth }: { children?: ReactNode; auth: boolean }) => {
    return (
        <AnimatePresence>
            <Flex
                component={motion.div}
                justify='center'
                align='center'
                className={classNames(cls.big, {}, [])}
            >
                {auth && (
                    <motion.div
                        transition={{ ease: 'linear' }}
                        initial={{ height: '90%', width: '100%' }}
                        key='auth2'
                        animate={{
                            height: '99%',
                            width: '100%',
                        }}
                        exit={{ width: 0, height: 0 }}
                    >
                        {children}
                    </motion.div>
                )}
                {!auth && (
                    <motion.div
                        initial={{ height: '90%', width: '100%' }}
                        transition={{ ease: 'linear' }}
                        key='auth3'
                        animate={{
                            height: '100%',
                            width: '100%',
                        }}
                        exit={{ width: 0, height: 0 }}
                    >
                        <Flex justify='center' align='center' className={cls.registerGradient}>
                            <AuthBack className={cls.logoIcon} />
                        </Flex>
                    </motion.div>
                )}
            </Flex>
        </AnimatePresence>
    )
}
