import { CompanyAccountData, defaultLogin, PersonalAccountData, useRegisterMutation } from '@/entities/user'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { emailValidator } from '@/shared/lib/validators/emailValidator'
import { phoneNumberValidator } from '@/shared/lib/validators/phoneNumberValidator'
import { ADDON_COLOR } from '@/shared/newUi/styles'
import { App, Button, DatePicker, Flex, Form, Input, InputProps, Space, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { stat } from 'fs'
import { useEffect, useMemo, useState } from 'react'

export const RegForm = () => {
    const dispatch = useAppDispatch()
    const { message, notification } = App.useApp()
    const isMobile = useMobilDeviceDetect()
    const [form] = useForm<PersonalAccountData | CompanyAccountData>()
    const [personalReg, setPersonalReg] = useState(true)
    const [register, { isSuccess, isUninitialized, status }] = useRegisterMutation()
    const pass = Form.useWatch('password', form)
    const loginHandler = () => {
        const values = form.getFieldsValue()
        if (personalReg) register({ ...values, personal_account: true } as PersonalAccountData)
        if (!personalReg) register({ ...values, personal_account: false } as CompanyAccountData)
    }
    useEffect(() => {
        form.resetFields()
    }, [])
    useEffect(() => {
        if (status === 'fulfilled') {
            notification.success({ message: 'Успешно. Подтвердите свой email открыв ссылку из письма' })
        }
        if (status === 'rejected') {
            message.error('Неудачно')
        }
    }, [status])
    const msg = useMemo(() => {
        return personalReg ? 'Вы юридическое лицо?' : 'Вы физическое лицо?'
    }, [personalReg])

    return (
        <Flex vertical style={{ width: '90%', height: isMobile ? '80%' : '70%' }} justify='space-between'>
            <Space
                style={{
                    marginBottom: '10px',
                    marginLeft: isMobile ? '' : '5%',
                    userSelect: 'none',
                }}
            >
                <Typography style={{ color: isMobile ? 'white' : 'black', whiteSpace: 'nowrap' }}>
                    {msg}
                </Typography>
                <Typography
                    style={{
                        color: ADDON_COLOR,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        whiteSpace: 'nowrap',
                    }}
                    onClick={() =>
                        setPersonalReg((prev) => {
                            form.setFieldValue('personal_account', !prev)
                            return !prev
                        })
                    }
                >
                    Нажмите сюда
                </Typography>
            </Space>
            <Form
                initialValues={{ personal_account: true }}
                onFinish={loginHandler}
                form={form}
                layout='vertical'
                style={{ width: '99%', height: '80%', overflowY: 'auto', padding: '10px' }}
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 0 }}
                labelAlign='left'
                title='Вход в личный кабинет'
            >
                {personalReg && (
                    <>
                        <Form.Item
                            name='surname'
                            label={null}
                            rules={[{ required: true, message: 'Введите фамилию' }]}
                        >
                            <CustomInput placeholder='Фамилия' />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Введите имя' }]}
                            name='first_name'
                            label={null}
                        >
                            <CustomInput placeholder='Имя' />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Введите отчество' }]}
                            name='patronymic'
                            label={null}
                        >
                            <CustomInput placeholder='Отчество' />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Введите дату рождения' }]}
                            name='birth_date'
                            label={null}
                        >
                            <DatePicker format={'DD.MM.YYYY'} placeholder='Дата рождения' />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Введите место проживания' }]}
                            name='location'
                            label={null}
                        >
                            <CustomInput placeholder='Место проживания' />
                        </Form.Item>
                        <Form.Item
                            name='phonenumber'
                            rules={[
                                { message: 'Некорректный номер телефона', validator: phoneNumberValidator },
                                { required: true, message: 'Введите номер телефона' },
                            ]}
                            label={null}
                        >
                            <CustomInput placeholder='Телефон' />
                        </Form.Item>
                        <Form.Item
                            name='email'
                            rules={[
                                { message: 'Некорректный email', validator: emailValidator },

                                { required: true, message: 'Введите email' },
                            ]}
                            label={null}
                        >
                            <CustomInput placeholder='Email' />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Введите имя пользователя' }]}
                            name='username'
                            label={null}
                        >
                            <CustomInput placeholder='Имя пользователя' />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[{ required: true, message: 'Введите пароль' }]}
                            label={null}
                        >
                            <CustomInput
                                onPaste={(e) => e.preventDefault()}
                                onCopy={(e) => e.preventDefault()}
                                placeholder='Пароль'
                                type='password'
                            />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                { required: true, message: 'Повторите пароль' },
                                {
                                    message: 'Пароли не совпадают',
                                    validator: (_, val: string) =>
                                        val === pass || !val ? Promise.resolve() : Promise.reject(),
                                },
                            ]}
                            name='repeat_password'
                            label={null}
                        >
                            <CustomInput
                                onPaste={(e) => e.preventDefault()}
                                onCopy={(e) => e.preventDefault()}
                                placeholder='Повторите пароль'
                                type='password'
                            />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput onPaste={(e) => e.preventDefault()} placeholder='Промокод' />
                        </Form.Item>
                    </>
                )}
                {!personalReg && (
                    <>
                        <Form.Item label={null}>
                            <CustomInput placeholder='Полное наименование организации' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='ИНН' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='КПП' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='ФИО' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='Должность' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='Юридический адрес' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='Телефон' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='Email' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='Имя пользователя' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='Пароль' type='password' />
                        </Form.Item>
                        <Form.Item label={null}>
                            <CustomInput placeholder='Повторите пароль' type='password' />
                        </Form.Item>
                    </>
                )}
                <Button style={{ width: '100%' }} htmlType='submit' type='primary'>
                    Регистрация
                </Button>
            </Form>
        </Flex>
    )
}

const CustomInput = (props: InputProps) => {
    const isMobile = useMobilDeviceDetect()

    return (
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
            {...props}
        />
    )
}
