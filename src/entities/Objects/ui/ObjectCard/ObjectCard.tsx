import classNames from '@/shared/lib/classNames/classNames'
import cls from './ObjectCard.module.scss'

import type { PropsWithChildren } from 'react'
import ObjectHouseIcon from '@/shared/assets/icons/ObjectCardHouseIcon.svg'
import ObjectSmallHouseIcon from '@/shared/assets/icons/ObjectCardSmallHouse.svg'
import ObjectMiddleHouseIcon from '@/shared/assets/icons/ObjectCardMiddleHouse.svg'
import ObjectSpecialHouseIcon from '@/shared/assets/icons/ObjectCardSpecialHouseIcon.svg'
interface ObjectCardProps {
    className?: string
    name: string
    address: string
    lastUpdate: string
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
}
const IconMapper: any = {
    1: ObjectHouseIcon,
    2: ObjectSmallHouseIcon,
    3: ObjectMiddleHouseIcon,
    4: ObjectSpecialHouseIcon,
}
export function ObjectCard(props: PropsWithChildren<ObjectCardProps>) {
    const { className = '', address, name, lastUpdate, children, onClick } = props
    const markerIcon = Math.floor(Math.random() * (4 - 1 + 1)) + 1
    const markerColor = Math.floor(Math.random() * (4 - 1 + 1)) + 1
    const mods = {
        [cls.redmarker]: markerColor === 1,
        [cls.greymarker]: markerColor === 2,
        [cls.orangemarker]: markerColor === 3,
        [cls.greenmarker]: markerColor === 4,
    }
    const Icon = IconMapper[markerIcon]
    return (
        <div onClick={onClick} className={classNames(cls.ObjectCard, mods, [className])}>
            <div className={cls.textBlock}>
                <p className={cls.objectTitle}>ТИП ОБЪЕКТА</p>
                <b className={cls.cardContent}>{name}</b>
                <p>{address}</p>
                <i className={cls.postfix}>Обновлен: {lastUpdate}</i>
            </div>
            {<Icon className={cls.icon} />}
            {/* <ObjectHouseIcon className={cls.icon}/> */}
        </div>
    )
}
