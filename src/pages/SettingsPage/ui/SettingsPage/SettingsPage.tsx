import { PropsWithChildren, useState } from 'react'
import { DetailView } from '@/widgets/DetailView'
import cls from './SettingsPage.module.scss'
import classNames from '@/shared/lib/classNames/classNames'
import { useNavigate } from 'react-router-dom'
import { Button, Flex, Modal, Select, Space, Switch, Tag, Typography } from 'antd'
import Card from 'antd/es/card/Card'
import { AddDevice } from '@/features/AddDevice/AddDevice'
import { editUserObject, getAllObjects, getUserObjectData } from '@/entities/Objects'
import { getObjectSubcategoryData, toggleSubcat } from '@/entities/ObjectSubCategory'
import { ModalDrawer } from '@/shared/newUi/ModalDrawer/ModalDrawer'
interface SettingsPageProps {
    className?: string
}
const MOCK = [
    'ОБЪЕКТЫ',
    'СИСТЕМЫ',
    'ЗАДАЧИ',
    'АРХИВ',
    'АНАЛИТИКА',
    'ЗАЯВКИ',
    'ПЛАНОВЫЕ РАБОТЫ',
    'ВИДЕОКАМЕРЫ',
]
const MOCK1 = [1, 2, 3, 4, 5, 6, 7]
const SettingsPage = (props: PropsWithChildren<SettingsPageProps>) => {
    const { className } = props
    const [openObjectToggleModal, setOpenObjectToggleModal] = useState(false)
    const { data: objects } = getAllObjects({})
    const [selectedObj, setSelectedObj] = useState<number>()
    const { data: objectSubcatData } = getObjectSubcategoryData(
        { id: selectedObj ?? 0 },
        { skip: !selectedObj },
    )
    const [toggleSystem] = toggleSubcat()
    const [toggleObject] = editUserObject()
    const { data: objectData } = getUserObjectData(selectedObj ?? 0, { skip: !selectedObj })
    const content = (
        <DetailView>
            <Flex wrap gap='middle' justify='center'>
                <Card type='inner' className={cls.card} title={'Объекты'}>
                    <Button onClick={() => setOpenObjectToggleModal(true)} type='primary'>
                        Управление состоянием
                    </Button>
                    <ModalDrawer
                        placement='bottom'
                        minMobileWidth='100%'
                        style={{ width: '90%' }}
                        footer={null}
                        open={openObjectToggleModal}
                        onCancel={() => setOpenObjectToggleModal(false)}
                        onClose={() => setOpenObjectToggleModal(false)}
                        closeIcon={null}
                        destroyOnClose
                    >
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
                    </ModalDrawer>
                </Card>
                <Card type='inner' className={cls.card} title={'Системы и приборы'}>
                    <AddDevice />
                </Card>
                <Card type='inner' className={cls.card} title={'Пользователи'} />
                <Card type='inner' className={cls.card} title={'Быстрое добавление'} />
                <Card type='inner' className={cls.card} title={'Пусто'} />
                <Card type='inner' className={cls.card} title={'Пусто'} />
            </Flex>
        </DetailView>
    )

    return <div className={classNames(cls.SettingsPage, {}, [])}>{content}</div>
}

export default SettingsPage
