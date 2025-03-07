// import classNames from 'shared/lib/classNames/classNames';
// import cls from './AddCategory.module.scss';

import { PropsWithChildren, useEffect, useState } from 'react'
import { useAppDispatch } from '@/shared/hooks/hooks'
import cls from './AddCategory.module.scss'
import { getAllObjects } from '@/entities/Objects'
import {
    addNewSubcategory,
    getSubcategoryTypes,
} from '@/entities/ObjectSubCategory'
import {
    App,
    Button,
    Form,
    Input,
    Modal,
    Select,
    SelectProps,
    Tooltip,
} from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
interface FormProps {
    name: string
    user_object: number
    subcategory_type: string
}

export function AddCategory({ form }: { form: FormInstance }) {
    const { data: objects } = getAllObjects({})
    const [open, setIsOpen] = useState(false)
    const { message } = App.useApp()
    const { data: subCatTypes } = getSubcategoryTypes()
    const [addSubcategory] = addNewSubcategory()

    const onFinish = () => {
        const { name, subcategory_type, user_object } = form.getFieldsValue()
        addSubcategory({ name, subcategory_type, user_object })
            .unwrap()
            .then(() => message.success('Система добавлена'))
            .catch(() => message.error('Не удалось добавить систему'))
    }

    return (
        <>
            <Form.Item name={'name'} label={'Название системы'}>
                <Input />
            </Form.Item>
            <Form.Item
                required
                rules={[{ required: true, message: 'Обязательное поле' }]}
                name={'subcategory_type'}
                label={'Тип системы'}
            >
                <Select
                    options={Object.keys(subCatTypes ?? {}).map((el) => ({
                        label: subCatTypes?.[el],
                        value: el,
                    }))}
                />
            </Form.Item>
            <Form.Item>
                <Button onClick={() => onFinish()}>Добавить</Button>
            </Form.Item>
        </>
    )
}
