import classNames from 'shared/lib/classNames/classNames';
import cls from './HeatNodeListItem.module.scss';

import type { PropsWithChildren } from 'react';

interface HeatNodeListItemProps {
 className?: string;
}

export function HeatNodeListItem(props: PropsWithChildren<HeatNodeListItemProps>) {
 const { className } = props;

 return (
<div className={classNames(cls.HeatNodeListItem,{},[className])}>

</div>
 );
}