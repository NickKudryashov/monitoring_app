import { ipValidator } from '@/shared/lib/validators/ipValidator'
import { phoneNumberValidator } from '@/shared/lib/validators/phoneNumberValidator'
import { Form, FormInstance, FormProps, Input, Select } from 'antd'

export const ConnectionTypeForm = ({
    form,
    hidden,
    resetOnContype,
}: {
    form: FormInstance
    resetOnContype?: boolean
    hidden: boolean
}) => {
    const conType = Form.useWatch('connection_type', form)
    if (hidden) {
        return null
    }
    return (
        <>
            <Form.Item name={'connection_type'} label='Тип соединения'>
                <Select
                    defaultValue={'TCP'}
                    onSelect={() => resetOnContype && form.resetFields(['ip', 'port', 'phonenumber'])}
                    options={[
                        { label: 'TCP', value: 'TCP' },
                        { label: 'UDP', value: 'UDP' },
                        { label: 'GSM', value: 'GSM' },
                    ]}
                />
            </Form.Item>
            <Form.Item
                required
                dependencies={['connection_type']}
                rules={[
                    {
                        required: conType !== 'GSM',
                        message: 'Обязательное поле',
                    },
                    {
                        message: 'Неверный IP адрес',
                        validator: ipValidator,
                    },
                ]}
                hidden={conType === 'GSM'}
                name={'ip'}
                label='IP'
            >
                <Input />
            </Form.Item>
            <Form.Item
                required
                dependencies={['connection_type']}
                rules={[
                    {
                        required: conType !== 'GSM',
                        message: 'Обязательное поле',
                    },
                    {
                        message: 'Неверный порт',
                        validator: phoneNumberValidator,
                    },
                ]}
                hidden={conType === 'GSM'}
                name={'port'}
                label='Порт'
            >
                <Input />
            </Form.Item>

            <Form.Item
                required
                dependencies={['connection_type']}
                hidden={conType !== 'GSM'}
                name={'phonenumber'}
                label='Номер телефона'
                rules={[
                    {
                        required: conType === 'GSM',
                        message: 'Обязательное поле',
                    },

                    {
                        message: 'Неверный номер телефона',
                        validator: (_, val: string) => {
                            if (
                                /^[\+(][7]{1}[-\s\.]?[9][(0-9)]{2}[-\s\.]?[0-9]{7}$/.test(val) ||
                                /^[8]{1}[-\s\.]?[9][(0-9)]{2}[-\s\.]?[0-9]{7}$/.test(val) ||
                                !val
                            ) {
                                return Promise.resolve()
                            }
                            return Promise.reject()
                        },
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </>
    )
}
