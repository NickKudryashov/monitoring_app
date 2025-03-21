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
import { App, Button, Checkbox, Flex, Form, Input, Space, Typography } from 'antd'
import { UnlockFilled, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ADDON_COLOR } from '@/shared/newUi/styles'
import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { useForm } from 'antd/es/form/Form'

interface DefaultAuthProps {
    className?: string
}

export function DefaultAuth(props: PropsWithChildren<DefaultAuthProps>) {
    const { className = '' } = props
    const isAuth = useSelector(getIsAuth)
    const isMobile = useMobilDeviceDetect()
    const navigate = useNavigate()
    const [form] = useForm()
    const dispatch = useAppDispatch()
    const { notification } = App.useApp()
    if (isAuth) {
        navigate(RoutePathAuth.main)
    }
    const loginHandler = () => {
        dispatch(
            defaultLogin({ email: form.getFieldValue('email'), password: form.getFieldValue('password') }),
        )
            .unwrap()
            .catch((data) => notification.error({ message: 'Не удалось войти' }))
    }
    return (
        <>
            <Flex
                // className={cls.mainLayout + ' ' + className}
                className={classNames(cls.mainLayout, { [cls.mobileBackground]: isMobile }, [className])}
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
                        }}
                    >
                        Авторизация
                    </Typography.Title>
                </Flex>
                <Form
                    onFinish={loginHandler}
                    form={form}
                    layout='vertical'
                    style={{ width: '80%', height: '50%' }}
                    wrapperCol={{ span: 24 }}
                    labelCol={{ span: 0 }}
                    labelAlign='left'
                    title='Вход в личный кабинет'
                >
                    <Form.Item
                        name='email'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                        label={null}
                    >
                        <Input
                            style={
                                isMobile
                                    ? {}
                                    : {
                                          border: 'none',
                                          borderBottom: `1px solid ${ADDON_COLOR}`,
                                          borderRadius: '0',
                                          background: 'transparent',
                                      }
                            }
                            placeholder='Логин'
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                        layout='vertical'
                        label={null}
                    >
                        <Input
                            style={
                                isMobile
                                    ? {}
                                    : {
                                          border: 'none',
                                          borderBottom: `1px solid ${ADDON_COLOR}`,
                                          borderRadius: '0',
                                          background: 'transparent',
                                      }
                            }
                            placeholder='Пароль'
                            prefix={<UnlockFilled />}
                            type='password'
                        />
                    </Form.Item>
                    <Form.Item style={{ justifySelf: 'center' }} label={null}>
                        <Flex style={{ width: '100%' }} justify-content='start' align='center' vertical>
                            <Button style={{ width: '100%' }} htmlType='submit' type='primary'>
                                Войти
                            </Button>
                            <Typography.Link>Забыли пароль?</Typography.Link>
                        </Flex>
                    </Form.Item>
                </Form>
                <Typography.Link
                    style={{
                        justifySelf: 'center',
                        alignSelf: 'center',
                        borderBottom: `1px solid ${ADDON_COLOR}`,
                    }}
                >
                    Регистрация
                </Typography.Link>
            </Flex>
        </>
    )
}
