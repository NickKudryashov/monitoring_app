import { Button, List, Typography } from 'antd'
import { memo, useState } from 'react'
import { GSMTask, useGetTaskListQuery, useRemoveTaksMutation } from '../api/api'
import { ModalDrawer } from '@/shared/newUi/ModalDrawer/ModalDrawer'
import { DeleteFilled } from '@ant-design/icons'

export const GSMTaksList = memo(() => {
    const { data } = useGetTaskListQuery()
    const [remove, {}] = useRemoveTaksMutation()
    const [listVisible, setListVisible] = useState(false)
    const mockData: GSMTask[] = [
        { id: 1, name: '123' },
        { id: 2, name: '123' },
        { id: 3, name: '123' },
        { id: 4, name: '123' },
        { id: 5, name: '123' },
    ]
    return (
        <>
            <Button type='primary' onClick={() => setListVisible(true)}>
                Список задач
            </Button>
            <ModalDrawer
                width={500}
                open={listVisible}
                closable={false}
                footer={null}
                height={700}
                placement='bottom'
                onCancel={() => setListVisible(false)}
                onClose={() => setListVisible(false)}
            >
                <List
                    header={<Typography.Title level={4}>Список активных GSM задач</Typography.Title>}
                    dataSource={mockData}
                    rowKey={(item) => item.id}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography>{item.name}</Typography>
                            <DeleteFilled onClick={() => remove({ id: item.id })} />
                        </List.Item>
                    )}
                />
            </ModalDrawer>
        </>
    )
})
