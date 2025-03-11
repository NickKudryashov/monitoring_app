// import classNames from 'shared/lib/classNames/classNames';
// import cls from './AddHeatDevice.module.scss';

import { StateSchema } from '@/app/providers/StoreProvider/config/stateSchema'
import { PropsWithChildren, useState } from 'react'
import { useSelector } from 'react-redux'
import $api from '@/shared/api'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { AppButon } from '@/shared/ui/AppButton/AppButton'
import { AppInput, InputThemes } from '@/shared/ui/AppInput/AppInput'
import { Modal } from '@/shared/ui/Modal/Modal'
import cls from './AddHeatDevice.module.scss'
import { VFlexBox } from '@/shared/ui/FlexBox/VFlexBox/VFlexBox'
import { getObjectSubcategoryData } from '@/entities/ObjectSubCategory'
import { getAllObjects } from '@/entities/Objects'
import { Button, Form, FormInstance, Input, message, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { FormProps } from '@/features/AddDevice/AddDevice'
interface AddHeatDeviceProps {
    className?: string
    onClose?: () => void
    isOpen?: boolean
    form: FormInstance
    hidden: boolean
}

interface DevCon {
    TCP: string
    UDP: string
    GSM: string
}

const DeviceConnection: DevCon = {
    TCP: 'TCP',
    UDP: 'UDP',
    GSM: 'GSM',
} as const

const TEROSS_TYPE = 'teross'
const ST10_229 = 'st10_229'
const ST10_234 = 'st10_234'
const ST10_236 = 'st10_236'
const ST20_238 = 'st20_238'
const ST20_239 = 'st20_239'
export function AddHeatDevice(props: PropsWithChildren<AddHeatDeviceProps>) {
    const { className, isOpen, onClose, form, hidden } = props
    if (hidden) {
        return null
    }
    const onFinish = async () => {
        const {
            connection_type,
            ip,
            port,
            phonenumber,
            subcat,
            user_object: usObj,
            devnum,
            device_type,
            systems: syss,
            devname,
        }: FormProps = form.getFieldsValue()
        const connection_info =
            connection_type !== DeviceConnection.GSM
                ? { port, ip, connection_type: connection_type }
                : { connection_type: connection_type, phone: phonenumber }
        const user_object = Number(usObj)
        const body = {
            name: devname,
            user_object,
            connection_info,
            subcategory: Number(subcat),
            device_num: Number(devnum),
            device_type: device_type,
            systems: syss?.map((el, i) => ({ index: i, name: el })),
        }
        const response = await $api.post('device/add', body)
        if (response.status === 200) {
            message.success('Успешно')
        } else {
            message.error('Неудачно')
        }
    }

    const finishClickHandler = async () => {
        try {
            const result = await form.validateFields()
            if (form.getFieldValue('systems')?.length) {
                onFinish()
            } else {
                message.error('Укажите системы для прибора')
            }
        } catch (e) {
            console.log(e)
            message.error('Заполните поля корректно')
        }
    }

    return (
        <>
            <Form.Item
                required
                rules={[{ required: true, message: 'Обязательное поле' }]}
                name='devname'
                label='Имя прибора'
            >
                <Input />
            </Form.Item>
            <Form.Item
                required
                rules={[{ required: true, message: 'Обязательное поле' }]}
                name='devnum'
                label='Номер прибора'
            >
                <Input />
            </Form.Item>
            <Form.Item
                required
                rules={[{ required: true, message: 'Обязательное поле' }]}
                name='device_type'
                label='Тип прибора'
            >
                <Select
                    options={[
                        { label: 'ВТЭ-1П140(141) тип 229', value: ST10_229 },
                        { label: 'ВТЭ-1П140(141) тип 234', value: ST10_234 },
                        { label: 'ВТЭ-1П140(141) тип 236', value: ST10_236 },
                        { label: 'ВТЭ-2П14хМ тип 238', value: ST20_238 },
                        { label: 'ВТЭ-2П15хМ тип 239', value: ST20_239 },
                        { label: 'Теросс-ТМ', value: TEROSS_TYPE },
                    ]}
                />
            </Form.Item>
            <Form.List name='systems'>
                {(fields, { add, remove }, { errors }) => (
                    <>
                        <Form.Item>
                            <Button
                                type='dashed'
                                onClick={() => {
                                    console.log(
                                        form.getFieldValue('systems')?.length,
                                    )
                                    ;(form.getFieldValue('systems')?.length ??
                                        0) <= 3
                                        ? add()
                                        : () => {}
                                }}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Добавить систему
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                        {fields.map((field, index) => (
                            <Form.Item required={false} key={field.key}>
                                {/* {index <= 3 ? ( */}
                                {/* <> */}
                                <Form.Item
                                    {...field}
                                    label={'Контур ' + (index + 1)}
                                    initialValue={'ТС' + (index + 1)}
                                    validateTrigger={['onChange', 'onBlur']}
                                    noStyle
                                >
                                    <Input
                                        style={{ width: '60%' }}
                                        suffix={
                                            <MinusCircleOutlined
                                                onClick={() =>
                                                    remove(fields.length - 1)
                                                }
                                            />
                                        }
                                    />
                                </Form.Item>
                                {/* </> */}
                                {/* // ) : null} */}
                            </Form.Item>
                        ))}
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button onClick={finishClickHandler}>Добавить</Button>
            </Form.Item>
        </>
    )
}
