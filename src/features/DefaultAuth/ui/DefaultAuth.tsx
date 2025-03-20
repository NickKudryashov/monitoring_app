import classNames from '@/shared/lib/classNames/classNames'
import cls from './DefaultAuth.module.scss'

import { PropsWithChildren, useState } from 'react'
import { AppInput } from '@/shared/ui/AppInput/AppInput'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { defaultLogin, getUserData } from '@/entities/user/Store/actionCreators'
import { AppCheckbox } from '@/shared/ui/AppCheckbox/AppCheckbox'
import { AppButon, AppButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { getIsAuth } from '@/entities/user'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RoutePathAuth, RoutePathPublic } from '@/shared/config/RouteConfig/RouteConfig'
import { Button, Checkbox, Flex, Form, Input, Space, Typography } from 'antd'
import { UnlockFilled, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ADDON_COLOR } from '@/shared/newUi/styles'

interface DefaultAuthProps {
    className?: string
}

export function DefaultAuth(props: PropsWithChildren<DefaultAuthProps>) {
    const { className = '' } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isAuth = useSelector(getIsAuth)
    const [rememeberUser, setRememberUser] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    if (isAuth) {
        navigate(RoutePathAuth.main)
    }
    return (
        <Flex
            vertical
            align='center'
            justify='flex-end'
            gap={'large'}
            style={{
                width: '22%',
                minWidth: '332px',
                maxWidth: '30%',
                height: '70%',
                boxShadow: 'rgba(0, 0, 0, 0.2) 4px 2px 8px 8px',
                zIndex: '1000',
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px',
                position: 'fixed',
                left: '30%',
                top: '12.5%',
            }}
            className={cls.registerGradient}
        >
            <Flex style={{ width: '80%', height: '80%' }} justify='center' align='center'>
                <Form
                    style={{ width: '80%', height: '90%' }}
                    wrapperCol={{ span: 24 }}
                    labelCol={{ span: 0 }}
                    labelAlign='left'
                    title='Вход в личный кабинет'
                >
                    <Typography.Title
                        level={3}
                        style={{
                            textAlign: 'center',
                            marginBottom: '30%',
                            justifySelf: 'center',

                            width: '100%',
                        }}
                    >
                        Авторизация
                    </Typography.Title>
                    <Form.Item name='username' label={null}>
                        <Input
                            style={{
                                border: 'none',
                                borderBottom: `1px solid ${ADDON_COLOR}`,
                                borderRadius: '0',
                                background: 'transparent',
                            }}
                            placeholder='Логин'
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>
                    <Form.Item name='password' layout='vertical' label={null}>
                        <Input
                            style={{
                                border: 'none',
                                borderBottom: `1px solid ${ADDON_COLOR}`,
                                borderRadius: '0',
                                background: 'transparent',
                            }}
                            placeholder='Пароль'
                            prefix={<UnlockFilled />}
                            type='password'
                        />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Checkbox style={{ marginTop: '20px' }}>Запомнить пароль</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ justifySelf: 'center' }} label={null}>
                        <Button type='primary'>АВТОРИЗАЦИЯ</Button>
                    </Form.Item>
                </Form>
            </Flex>

            <Typography.Link style={{ justifySelf: 'center', alignSelf: 'center' }}>
                Регистрация
            </Typography.Link>
        </Flex>
    )
}
