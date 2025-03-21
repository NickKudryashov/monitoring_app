import classNames from '@/shared/lib/classNames/classNames'
import cls from './AuthPage.module.scss'

import { useState, type PropsWithChildren, type ReactNode } from 'react'
import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { DefaultAuth } from '@/features/DefaultAuth/ui'
import { Flex } from 'antd'
import AuthBack from '@/shared/assets/icons/AuthBack.svg'
interface AuthPageProps {
    className?: string
}

export function AuthPage(props: PropsWithChildren<AuthPageProps>) {
    const { className = '' } = props
    const isMobile = useMobilDeviceDetect()
    const [a, setA] = useState(true)
    return (
        <Flex
            data-testid='AuthPage'
            className={classNames(cls.AuthPage, {}, [className])}
            align='center'
            justify='center'
            onClick={() => setA((prev) => !prev)}
        >
            {!isMobile && (
                <Flex
                    justify='center'
                    align='center'
                    style={{ minWidth: '800px', width: '100%', height: '90%' }}
                >
                    <>
                        <BigField auth={a}>
                            <DefaultAuth />
                        </BigField>
                        <SmallField auth={a} />
                    </>
                </Flex>
            )}
            {isMobile && (
                <Flex className={cls.mobileForm}>
                    <DefaultAuth />
                </Flex>
            )}
        </Flex>
    )
}

const SmallField = ({ children, auth }: { children?: ReactNode; auth: boolean }) => {
    return (
        <Flex justify='center' align='center' className={cls.small}>
            {children ? (
                children
            ) : (
                <>
                    <Flex justify='center' align='center' className={cls.registerGradient}>
                        <AuthBack className={cls.logoIcon} />
                    </Flex>
                </>
            )}
        </Flex>
    )
}

const BigField = ({ children, auth }: { children?: ReactNode; auth: boolean }) => {
    return (
        <Flex justify='center' align='center' className={cls.big}>
            {children ? (
                children
            ) : (
                <Flex justify='center' align='center' className={cls.registerGradient}>
                    <AuthBack className={cls.logoIcon} />
                </Flex>
            )}
        </Flex>
    )
}
