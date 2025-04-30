import { ConfigProvider, Empty } from 'antd'
import { ReactNode } from 'react'
import locale from 'antd/locale/ru_RU'
import dayjs from 'dayjs'

import 'dayjs/locale/ru'

dayjs.locale('ru')
export const AntProvier = ({ children }: { children?: ReactNode }) => {
    return (
        <ConfigProvider locale={locale} renderEmpty={() => <Empty description='Нет данных' />}>
            {children}
        </ConfigProvider>
    )
}
