import { App, Button, Form, Input, Typography } from 'antd'
import { ReactNode, useCallback, useState } from 'react'
import { useCheckPasswordMutation } from '../../api/api'

export const RequiredPassword = ({ children }: { children: ReactNode }) => {
    const [accessGranted, setAccessGranted] = useState(false)
    const [check] = useCheckPasswordMutation()
    const { notification } = App.useApp()
    const [form] = Form.useForm()
    const finishClickHandler = async () => {
        const password = form.getFieldValue('password')
        try {
            await check({ password }).unwrap()
            setAccessGranted(true)
        } catch {
            notification.error({ message: 'Введен неверный пароль' })
        }
    }
    if (accessGranted) return children
    return (
        <Form form={form} onFinish={finishClickHandler}>
            <Typography>Для продолжения введите пароль:</Typography>
            <Form.Item name='password' rules={[{ required: true, message: 'Пароль не может быть пустым' }]}>
                <Input type='password' />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Пароль не может быть пустым' }]}>
                <Button htmlType='submit' type='primary'>
                    Отправить
                </Button>
            </Form.Item>
        </Form>
    )
}
