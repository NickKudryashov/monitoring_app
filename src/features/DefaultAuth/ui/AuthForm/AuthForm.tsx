import { useAppDispatch } from '@/shared/hooks/hooks'
import { App, Button, Flex, Form, FormInstance, Input, Typography } from 'antd'
import { defaultLogin, getUserData } from '@/entities/user/Store/actionCreators'
import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { ADDON_COLOR } from '@/shared/newUi/styles'
import { UnlockFilled, UserOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'

export const AuthForm = () => {
    const dispatch = useAppDispatch()
    const isMobile = useMobilDeviceDetect()
    const [form] = useForm()
    const { notification } = App.useApp()
    const loginHandler = () => {
        dispatch(
            defaultLogin({ email: form.getFieldValue('email'), password: form.getFieldValue('password') }),
        )
            .unwrap()
            .catch((data) => notification.error({ message: 'Не удалось войти' }))
    }
    return (
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
            <Form.Item name='email' rules={[{ required: true, message: 'Обязательное поле' }]} label={null}>
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
    )
}
