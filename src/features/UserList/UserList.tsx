import { useUserListQueryQuery } from '@/entities/user'
import { Permissions } from '@/entities/user/ui/Permissions/Permissions'
import { ModalDrawer } from '@/shared/newUi/ModalDrawer/ModalDrawer'
import { Button, Card, List, Switch, Typography } from 'antd'
import { useState } from 'react'
import { UserRow } from './UserRow'

export const UserList = () => {
    const [visible, setVisible] = useState(false)
    const { data } = useUserListQueryQuery()
    return (
        <Permissions>
            <Button onClick={() => setVisible(true)} type='primary'>
                Управление пользователями
            </Button>
            <ModalDrawer
                title='Управление пользователями'
                styles={{
                    body: {
                        maxHeight: 'calc(100vh - 200px)',
                        overflowY: 'auto',
                    },
                }}
                width={500}
                open={visible}
                closable={false}
                footer={null}
                height={350}
                placement='bottom'
                onCancel={() => setVisible(false)}
                onClose={() => setVisible(false)}
            >
                <List dataSource={data?.users} renderItem={(item) => <UserRow key={item.id} item={item} />} />
            </ModalDrawer>
        </Permissions>
    )
}
