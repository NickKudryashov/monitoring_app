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
import { ToggleObject } from '@/features/ToggleObject/ui/ToggleObject'
import { GSMTaksList } from '@/features/GsmList/ui/GsmList'
import { Permissions } from '@/entities/user/ui/Permissions/Permissions'
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

    const content = (
        <DetailView>
            <Flex wrap gap='middle' justify='center'>
                <Card type='inner' className={cls.card} title={'Объекты'}>
                    <ToggleObject />
                </Card>
                <Card type='inner' className={cls.card} title={'Системы и приборы'}>
                    <AddDevice />
                </Card>
                <Card type='inner' className={cls.card} title={'Пользователи'}>
                    <Permissions>
                        <Button type='primary'>Управление пользователями</Button>
                    </Permissions>
                </Card>
                <Card type='inner' className={cls.card} title={'Быстрое добавление'} />
                <Card type='inner' className={cls.card} title={'Задачи'}>
                    <GSMTaksList />
                </Card>
                <Card type='inner' className={cls.card} title={'Пусто'} />
            </Flex>
        </DetailView>
    )

    return <div className={classNames(cls.SettingsPage, {}, [])}>{content}</div>
}

export default SettingsPage
