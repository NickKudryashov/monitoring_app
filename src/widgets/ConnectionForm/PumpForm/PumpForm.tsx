import {
    GSMConnection,
    InternetConnection,
} from '@/shared/types/connectionTypes'
import { App } from 'antd'
import useForm from 'antd/es/form/hooks/useForm'
import { FormTemplate } from '../FormTemplate'
import { prepareData, useInitData } from '../useFormFinish'
import {
    useEditPumpConnectionInfoMutation,
    useGetPumpConnectionInfoQuery,
} from '@/entities/PumpDevice'
type FormProps = InternetConnection | GSMConnection
export const PumpForm = ({ id }: { id: number }) => {
    const [form] = useForm<FormProps>()
    const { message } = App.useApp()
    const { data: currentConnection, isSuccess: isGetSuccess } =
        useGetPumpConnectionInfoQuery(id, { skip: !id })
    const [editConnection, { isSuccess, isError }] =
        useEditPumpConnectionInfoMutation()
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
