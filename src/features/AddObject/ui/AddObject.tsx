import { PropsWithChildren, useState } from 'react'
import $api from '@/shared/api'
import { AppButon } from '@/shared/ui/AppButton/AppButton'
import { AppInput, InputThemes } from '@/shared/ui/AppInput/AppInput'
import cls from './AddObject.module.scss'
import { createUserObject } from '@/entities/Objects'
import { App, Button, Form, Input, Modal, Select } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
interface AddObjectProps {
    className?: string
    form: FormInstance
}
interface FormProps {
    object_name: string
    address: string
    abonent: string
}

export function AddObject({ form }: PropsWithChildren<AddObjectProps>) {
    const [opened, setIsOpened] = useState(false)
    const { message } = App.useApp()
    const [createObj] = createUserObject()
    const onFinish = () => {
        const abonent = form.getFieldValue('abonent')
        const address = form.getFieldValue('address')
        const name = form.getFieldValue('object_name')
        createObj({ abonent, address, name })
            .unwrap()
            .then(() => message.success('Объект успешно добавлен'))
            .catch(() => message.error('Не удалось добавить объект'))
    }

    return (
        <>
            <Form.Item
                rules={[{ required: true, message: 'Обязательное поле' }]}
                required
                name={'object_name'}
                label='Название объекта'
            >
                <Input />
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: 'Обязательное поле' }]}
                required
                name='address'
                label='Адрес'
            >
                <Input />
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: 'Обязательное поле' }]}
                required
                name='abonent'
                label='Абонент'
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button onClick={onFinish}>Добавить</Button>
            </Form.Item>
        </>
    )
}
