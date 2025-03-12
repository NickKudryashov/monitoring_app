import { ConnectionTypeForm } from '@/features/ConnectionTypeForm/ConnectionTypeForm'
import { ModalDrawer } from '@/shared/newUi/ModalDrawer/ModalDrawer'
import { SettingOutlined } from '@ant-design/icons'
import { Button, FloatButton, Form, FormInstance, Space } from 'antd'
import { useState } from 'react'

export const FormTemplate = ({
    onFinish,
    form,
}: {
    onFinish: () => void
    form: FormInstance
}) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <FloatButton
                icon={<SettingOutlined />}
                onClick={() => {
                    setOpen(true)
                }}
            ></FloatButton>
            <ModalDrawer
                height={'70%'}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                onCancel={() => setOpen(false)}
                title={'Редактировать настройки подключения'}
                open={open}
                placement='bottom'
                onClose={() => setOpen(false)}
                cancelText={'Закрыть'}
                width={'45%'}
                minFullsizeWidth='500px'
            >
                <Form
                    labelAlign='left'
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                >
                    <ConnectionTypeForm hidden={false} form={form} />\
                    <Space>
                        <Button type='primary' onClick={onFinish}>
                            Применить
                        </Button>
                        <Button onClick={() => setOpen(false)}>Закрыть</Button>
                    </Space>
                </Form>
            </ModalDrawer>
        </>
    )
}
