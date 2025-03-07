import { Form, FormInstance, FormProps, Input, Select } from 'antd'

export const ConnectionTypeForm = ({
    form,
    hidden,
}: {
    form: FormInstance
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
                    onSelect={() =>
                        form.resetFields(['ip', 'port', 'phonenumber'])
                    }
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
                        validator: (_, val: string) => {
                            if (
                                /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(
                                    val,
                                ) ||
                                !val
                            ) {
                                return Promise.resolve()
                            }
                            return Promise.reject()
                        },
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
                        validator: (_, val: string) => {
                            if (
                                /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(
                                    val,
                                ) ||
                                !val
                            ) {
                                return Promise.resolve()
                            }
                            return Promise.reject()
                        },
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
                                /^[\+(][7]{1}[-\s\.]?[9][(0-9)]{2}[-\s\.]?[0-9]{7}$/.test(
                                    val,
                                ) ||
                                /^[8]{1}[-\s\.]?[9][(0-9)]{2}[-\s\.]?[0-9]{7}$/.test(
                                    val,
                                ) ||
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
