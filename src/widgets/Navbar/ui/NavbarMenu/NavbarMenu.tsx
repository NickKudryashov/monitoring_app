import { HFlexBox } from '@/shared/ui/FlexBox/HFlexBox/HFlexBox'
import { VFlexBox } from '@/shared/ui/FlexBox/VFlexBox/VFlexBox'
import AdressIcon from '@/shared/assets/icons/SidebarMobileIconAddressIcon.svg'
import EventIcon from '@/shared/assets/icons/SidebarMobileIconEventsIcon.svg'
import TasksIcon from '@/shared/assets/icons/SidebarMobileIconTasksIcon.svg'
import PlannedWorkIcon from '@/shared/assets/icons/SidebarMobileIconPlannedIcon.svg'
import SettingsIcon from '@/shared/assets/icons/SidebarMobileIconSettingsIcon.svg'
import TicketsIcon from '@/shared/assets/icons/SidebarMobileIconTicketsIcon.svg'
import UserObjectIcon from '@/shared/assets/icons/SidebarMobileIconObjectIcon.svg'
import VideoIcon from '@/shared/assets/icons/SidebarMobileIconVideoIcon.svg'
import { Link, useNavigate } from 'react-router-dom'
import { RoutePathAuth } from '@/shared/config/RouteConfig/RouteConfig'
import cls from './NavbarMenu.module.scss'
import classNames from '@/shared/lib/classNames/classNames'
import { memo } from 'react'
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
// type MenuItem = Required<MenuProps>['items'][number]

// const items: MenuItem[] = [
//     {
//         key: 'sub1',
//         label: 'Navigation One',
//         icon: <MailOutlined />,
//     },
//     {
//         key: 'sub2',
//         label: 'Navigation Two',
//         icon: <AppstoreOutlined />,
//         children: [
//             { key: '5', label: 'Option 5' },
//             { key: '6', label: 'Option 6' },
//             {
//                 key: 'sub3',
//                 label: 'Submenu',
//             },
//         ],
//     },
//     {
//         key: 'sub4',
//         label: 'Navigation Three',
//         icon: <SettingOutlined />,
//     },
// ]
export const NavbarMenu = memo((props: { onClose: () => void }) => {
    const { onClose } = props
    const navigate = useNavigate()
    const clickHandler = (path: string) => {
        navigate(path)
        onClose()
    }
    return (
        <VFlexBox width='33%' className={cls.navbarMenu}>
            <Link
                className={cls.link}
                to={RoutePathAuth.category}
                onClick={onClose}
            >
                <HFlexBox
                    onClick={() => clickHandler(RoutePathAuth.object)}
                    className={classNames(cls.menuRow, {}, [cls.firstRow])}
                >
                    <UserObjectIcon className={cls.icon} />
                    <p>Объекты</p>
                </HFlexBox>
            </Link>

            <Link
                className={cls.link}
                to={RoutePathAuth.detail_objects}
                onClick={onClose}
            >
                <HFlexBox
                    onClick={() => clickHandler(RoutePathAuth.detail_objects)}
                    className={cls.menuRow}
                >
                    <AdressIcon />
                    <p>Адреса</p>
                </HFlexBox>
            </Link>
            <HFlexBox className={cls.menuRow}>
                <EventIcon />
                <p>События</p>
            </HFlexBox>
            <HFlexBox className={cls.menuRow}>
                <TasksIcon />
                <p>Задачи</p>
            </HFlexBox>
            <HFlexBox
                onClick={() => clickHandler(RoutePathAuth.settings)}
                className={cls.menuRow}
            >
                <SettingsIcon />
                <p>Настройки</p>
            </HFlexBox>
            <HFlexBox className={cls.menuRow}>
                <TicketsIcon />
                <p>Заявки</p>
            </HFlexBox>
            <HFlexBox className={cls.menuRow}>
                <PlannedWorkIcon />
                <p>Плановые работы</p>
            </HFlexBox>
            <HFlexBox className={cls.menuRow}>
                <VideoIcon />
                <p>Видеокамеры</p>
            </HFlexBox>
        </VFlexBox>
    )
})

NavbarMenu.displayName = 'NavbarMenu'
