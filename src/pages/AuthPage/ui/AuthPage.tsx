import classNames from '@/shared/lib/classNames/classNames'
import cls from './AuthPage.module.scss'

import type { PropsWithChildren } from 'react'
import AuthLogoIcon from '@/shared/assets/icons/AuthLogoIcon.svg'
import { VFlexBox } from '@/shared/ui/FlexBox/VFlexBox/VFlexBox'
import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { HFlexBox } from '@/shared/ui/FlexBox/HFlexBox/HFlexBox'
import { DefaultAuth } from '@/features/DefaultAuth/ui'
import { Flex, Layout } from 'antd'
import AuthBack from '@/shared/assets/icons/AuthBack.svg'
interface AuthPageProps {
    className?: string
}

export function AuthPage(props: PropsWithChildren<AuthPageProps>) {
    const { className = '' } = props
    const isMobile = useMobilDeviceDetect()
    return (
        <VFlexBox
            data-testid='AuthPage'
            className={classNames(cls.AuthPage, {}, [className])}
            alignItems='center'
            gap='5px'
        >
            {/* {!isMobile && <Navbar className={cls.navbar} isAuth={false} />} */}
            <HFlexBox
                height='70%'
                width={'100%'}
                align='center'
                alignItems='center'
                style={{ position: 'relative', minWidth: '800px' }}
            >
                {/* <AuthWidget /> */}
                <DefaultAuth />
                <Flex justify='center' align='center' style={{ width: '20%', height: '70%' }}>
                    <div
                        style={{
                            position: 'fixed',
                            top: '15%',
                            left: '50%',
                            minWidth: '450px',
                            maxWidth: '500px',

                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                            boxShadow: 'rgba(0, 0, 0, 0.2) 4px 2px 8px 8px',
                            height: '65%',
                            width: '30%',
                        }}
                        className={cls.registerGradient}
                    />
                    <AuthBack
                        // fill='#23a6d5'
                        className={cls.logoIcon}
                        style={{
                            maxWidth: '100%',
                            top: '27%',
                            left: '44%',
                            fontSize: '30px',
                            height: '40%',
                            width: '40%',
                            minWidth: '450px',
                        }}
                    />
                    {/* <AuthBack /> */}
                </Flex>
                {isMobile && <p className={cls.title}>АлВик-сервис</p>}
            </HFlexBox>
        </VFlexBox>
    )
}
