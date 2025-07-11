import { editUserObject, getAllObjects, getUserObjectData } from '@/entities/Objects'
import { getObjectSubcategoryData, toggleSubcat } from '@/entities/ObjectSubCategory'
import { RequiredPassword } from '@/entities/user'
import { ModalDrawer } from '@/shared/newUi/ModalDrawer/ModalDrawer'
import { Button, Card, Empty, Flex, Select, Space, Switch, Tag, Typography } from 'antd'
import { useMemo, useState } from 'react'

export const ToggleObject = () => {
    const [openObjectToggleModal, setOpenObjectToggleModal] = useState(false)
    const { data: objects } = getAllObjects({ showAll: '1' })
    const [selectedObj, setSelectedObj] = useState<number>()
    const { data: objectSubcatData } = getObjectSubcategoryData(
        { id: selectedObj ?? 0 },
        { skip: !selectedObj },
    )
    const [toggleSystem] = toggleSubcat()
    const [toggleObject] = editUserObject()
    const { data: objectData } = getUserObjectData(selectedObj ?? 0, { skip: !selectedObj })
    const height = useMemo(() => {
        if (!objectSubcatData?.data) {
            return 300
        }
        return 700
    }, [objectSubcatData])
    return (
        <>
            <Button onClick={() => setOpenObjectToggleModal(true)} type='primary'>
                Управление состоянием
            </Button>
            <ModalDrawer
                placement='bottom'
                minMobileWidth='100%'
                style={{ width: '90%' }}
                height={height}
                footer={null}
                open={openObjectToggleModal}
                onCancel={() => setOpenObjectToggleModal(false)}
                onClose={() => setOpenObjectToggleModal(false)}
                closeIcon={null}
                destroyOnClose
            >
                <RequiredPassword>
                    <Flex vertical>
                        <Typography.Title level={3}>Выберите объект</Typography.Title>
                        <Select
                            defaultValue={selectedObj}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            title='Выбор объекта'
                            style={{ width: '350px', maxWidth: '99%' }}
                            options={objects?.map((el) => ({
                                label: `${el.name} ${el.address}`,
                                value: el.id,
                            }))}
                            onSelect={(value) => {
                                if (value) setSelectedObj(value)
                            }}
                            showSearch
                        ></Select>
                        {selectedObj && (
                            <Card
                                title={
                                    <Flex gap='small' vertical style={{ width: '100%', padding: '5px' }}>
                                        <Typography
                                            style={{
                                                maxWidth: '70%',
                                                height: '100%',
                                                whiteSpace: 'normal',
                                            }}
                                        >{`${objectData?.name} ${objectData?.address}`}</Typography>
                                        <Tag
                                            style={{ maxHeight: '25px', maxWidth: '70px' }}
                                            color={objectData?.enabled ? 'green' : 'red'}
                                        >
                                            {objectData?.enabled ? 'Включен' : 'Выключен'}
                                        </Tag>
                                        <Switch
                                            checked={objectData?.enabled}
                                            style={{ maxWidth: '40px' }}
                                            onChange={(checked) =>
                                                toggleObject({ id: selectedObj, enabled: checked })
                                            }
                                        />
                                    </Flex>
                                }
                            >
                                <Flex gap='small' vertical>
                                    {objectSubcatData?.data?.map((el) => (
                                        <Space key={el.id} direction='vertical'>
                                            <Card title={null}>
                                                <Space direction='vertical'>
                                                    <Typography>
                                                        {el.name}{' '}
                                                        <Tag color={el.enabled ? 'green' : 'red'}>
                                                            {el.enabled ? 'Включена' : 'Выключена'}
                                                        </Tag>
                                                    </Typography>
                                                    <Switch
                                                        defaultChecked={el.enabled}
                                                        onChange={(checked) =>
                                                            toggleSystem({ id: el.id, enabled: checked })
                                                        }
                                                    />
                                                </Space>
                                            </Card>
                                        </Space>
                                    ))}
                                </Flex>
                            </Card>
                        )}
                    </Flex>
                </RequiredPassword>
            </ModalDrawer>
        </>
    )
}
