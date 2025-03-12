import cls from './HeatForm.module.scss'
import { ModalDrawer } from '@/shared/newUi/ModalDrawer/ModalDrawer'
import { ConnectionTypeForm } from '@/features/ConnectionTypeForm/ConnectionTypeForm'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import {
    useEditHeatConnectionInfoMutation,
    useGetHeatConnectionInfoQuery,
} from '@/entities/Heatcounters'
import {
    GSMConnection,
    InternetConnection,
} from '@/shared/types/connectionTypes'
import { useEffect, useMemo, useState } from 'react'
import { App, Button, FloatButton, Form, Space } from 'antd'
import useForm from 'antd/es/form/hooks/useForm'
import { SettingFilled, SettingOutlined } from '@ant-design/icons'
import { FormTemplate } from '../FormTemplate'
import { prepareData, useInitData } from '../useFormFinish'
type FormProps = InternetConnection | GSMConnection
export const HeatForm = ({ id }: { id: number }) => {
    const [form] = useForm<FormProps>()
    const { message } = App.useApp()
    const { data: currentConnection, isSuccess: isGetSuccess } =
        useGetHeatConnectionInfoQuery(id, { skip: !id })
    const [editConnection, { isSuccess, isError }] =
        useEditHeatConnectionInfoMutation()
    useInitData({ currentConnection, form, isGetSuccess })

    const finishHandler = async () => {
        const data = prepareData({ form })
        try {
            const result = await editConnection({
                ...data,
                system_id: id,
            }).unwrap()
            message.success('Настройки подключения изменены')
        } catch {
            message.error('Ошибка изменения')
        }
    }

    return (
        <>
            <FormTemplate form={form} onFinish={finishHandler} />
        </>
    )
}
