import { getAutomaticDeviceTypes } from '@/entities/AutomaticDevice'
import {
    Button,
    Card,
    Drawer,
    Flex,
    Form,
    Input,
    Modal,
    Select,
    Steps,
    Typography,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useMemo, useState } from 'react'
import { AddCategory } from '../AddCategory'
import { createUserObject, getAllObjects } from '@/entities/Objects'
import { AddObject } from '../AddObject'
import { getObjectSubcategoryData } from '@/entities/ObjectSubCategory'
import { ConnectionTypeForm } from '../ConnectionTypeForm/ConnectionTypeForm'
import { AddHeatDevice } from '../AddHeatDevice'
import { ModalDrawer } from '@/shared/newUi/ModalDrawer/ModalDrawer'

const electroTypes = [
    { value: 'um_31', label: 'УМ-31 GPRS' },
    { value: 'um_31_rtu', label: 'УМ-31 RTU' },
]

const pumpTypes = [
    { value: 'sk_712', label: 'SK 712' },
    { value: 'grundfoss', label: 'Grundfoss' },
]

const autoTypes = [
    { value: 'danfoss_ecl_210', label: 'ECL Comfort 210' },
    { value: 'danfoss_ecl_310', label: 'ECL Comfort 310' },
    { value: 'owen_trm_1032m', label: 'ОВЕН ТРМ 103' },
    { value: 'owen_trm_232m', label: 'ОВЕН ТРМ 232' },
]

type SelectedDevice = 'heat' | 'electro' | 'auto' | 'pump'
type Connections = 'TCP' | 'UDP' | 'GSM'
export interface FormProps {
    selected_dev_type: SelectedDevice
    vendor: string
    connection_type: Connections
    ip: string
    port: string
    phonenumber: string
    devnum: number
    user_object: number
    device_type: string
    systems: string[]
    subcat: string
    devname: string
}

export const AddDevice = () => {
    const [form] = useForm<FormProps>()
    const [open, setOpen] = useState(false)
    const [showObjectAdd, setShowObjectAdd] = useState(false)
    const [showSubcatAdd, setShowSubcatAdd] = useState(false)
    const { data: objects } = getAllObjects({})
    const selectedObject = Form.useWatch('user_object', form)
    const selectedSubcat = Form.useWatch('subcat', form)
    const selected_dtype = Form.useWatch('selected_dev_type', form)
    const [createObj, { data: addObjectData }] = createUserObject({
        fixedCacheKey: 'ADDOBJ',
    })
    const {
        data: subcats,
        isLoading,
        refetch,
    } = getObjectSubcategoryData({
        id: Number(selectedObject),
    })
    const onFinish = () => {
        alert(form.getFieldValue('user_object'))
    }
    const [step, setStep] = useState(0)
    return (
        <>
            <Button
                onClick={() => {
                    setOpen(true)
                    console.log(form?.getFieldValue('selected_dev_type'))
                }}
                type='primary'
            >
                Добавить прибор
            </Button>
            <ModalDrawer
                height={'90%'}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={() => setOpen(false)}
                title={'Добавить прибор'}
                open={open}
                placement='bottom'
                onClose={() => setOpen(false)}
                cancelText={'Закрыть'}
                width={'45%'}
                minFullsizeWidth='800px'
            >
                <Flex style={{ width: '100%' }} gap={'small'}>
                    <Form
                        style={{ width: '100%', maxWidth: '750px' }}
                        initialValues={{ connection_type: 'TCP' }}
                        onFinish={onFinish}
                        labelAlign='left'
                        wrapperCol={{ span: 16 }}
                        labelCol={{ span: 8 }}
                        form={form}
                        title=''
                    >
                        <Card
                            title={'Выбор и добавление объекта'}
                            style={{ marginTop: '8px' }}
                        >
                            <Form.Item
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: 'Обязательное поле',
                                    },
                                ]}
                                name={'user_object'}
                                label={'Объект'}
                            >
                                <Select
                                    options={objects?.map((el) => ({
                                        label: `${el.name} ${el.address}`,
                                        value: el.id,
                                    }))}
                                    onSelect={() => setStep(1)}
                                    showSearch
                                    optionFilterProp='label'
                                ></Select>
                            </Form.Item>
                            <Form.Item name='add_object'>
                                <Flex gap='small'>
                                    <Typography.Text>
                                        Не нашли нужный объект?
                                    </Typography.Text>
                                    <Typography.Link
                                        onClick={() =>
                                            setShowObjectAdd((prev) => !prev)
                                        }
                                    >
                                        {showObjectAdd ? 'скрыть' : 'добавить'}
                                    </Typography.Link>
                                </Flex>
                            </Form.Item>
                            {showObjectAdd && (
                                <AddObject
                                    onFormFinish={setShowObjectAdd}
                                    form={form}
                                />
                            )}
                        </Card>
                        {selectedObject && (
                            <Card
                                title={'Выбор и добавление системы'}
                                style={{ marginTop: '8px' }}
                            >
                                <Form.Item
                                    required
                                    label='Выбор системы'
                                    name='subcat'
                                >
                                    <Select
                                        options={subcats?.data?.map((el) => ({
                                            label: el.name,
                                            value: el.id,
                                        }))}
                                        loading={isLoading}
                                        onSelect={() => setStep(2)}
                                    />
                                </Form.Item>
                                <Form.Item name='add_object'>
                                    <Flex gap='small'>
                                        <Typography.Text>
                                            Не нашли нужную систему?
                                        </Typography.Text>
                                        <Typography.Link
                                            onClick={() =>
                                                setShowSubcatAdd(
                                                    (prev) => !prev,
                                                )
                                            }
                                        >
                                            {showSubcatAdd
                                                ? 'скрыть'
                                                : 'добавить'}
                                        </Typography.Link>
                                    </Flex>
                                </Form.Item>

                                {showSubcatAdd && (
                                    <AddCategory
                                        onFinishForm={setShowSubcatAdd}
                                        form={form}
                                    />
                                )}
                            </Card>
                        )}
                        <Card
                            hidden={!selectedSubcat}
                            title='Общие данные по прибору'
                        >
                            <Form.Item
                                name='selected_dev_type'
                                label={'Категория прибора'}
                            >
                                <Select
                                    onChange={() => {
                                        form.setFieldsValue({
                                            vendor: undefined,
                                        })
                                    }}
                                    defaultValue={undefined}
                                    options={[
                                        {
                                            label: 'Теплосчетчик',
                                            value: 'heat',
                                        },
                                        {
                                            label: 'АСКУЭ прибор',
                                            value: 'electro',
                                        },
                                        {
                                            label: 'АСУТП прибор',
                                            value: 'auto',
                                        },
                                        {
                                            label: 'Насосная станция',
                                            value: 'pump',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <ConnectionTypeForm
                                hidden={!selected_dtype}
                                form={form}
                            />
                            <AddHeatDevice
                                hidden={selected_dtype !== 'heat'}
                                form={form}
                            />
                        </Card>
                    </Form>
                </Flex>
            </ModalDrawer>
        </>
    )
}
