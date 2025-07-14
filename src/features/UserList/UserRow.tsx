import { useEditUserMutation, User } from '@/entities/user/api/api'
import { Card, Flex, Input, Space, Switch, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'

export const UserRow = ({ item }: { item: User }) => {
    const [edit] = useEditUserMutation()
    return (
        <Card
            title={
                <Flex justify='space-between' style={{ padding: '5px' }}>
                    <Space direction='vertical'>
                        <Typography>{item.username}</Typography>
                        <Typography>{item.email}</Typography>
                    </Space>
                    <Tag style={{ height: '25px' }} color={item.banned ? 'red' : 'green'}>
                        {item.banned ? 'Заблокирован' : 'Активен'}
                    </Tag>
                </Flex>
            }
        >
            <Flex vertical gap='25px' justify='space-between'>
                <Space>
                    <Typography>Управление блокировкой</Typography>
                    <Switch
                        value={item.banned}
                        onChange={(value) => {
                            edit({ id: item.id, banned: value })
                        }}
                        checked={item.banned}
                        title='Заблокирован'
                    />
                </Space>
                <Space>
                    <Typography>Комментарий к блокировке</Typography>
                    <Input
                        value={item.comment}
                        onChange={(ev) => {
                            edit({ id: item.id, comment: ev.target.value })
                        }}
                    />
                </Space>
            </Flex>
        </Card>
    )
}
