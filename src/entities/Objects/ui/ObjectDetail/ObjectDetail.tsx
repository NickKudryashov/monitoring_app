import classNames from 'shared/lib/classNames/classNames';
import cls from './ObjectDetail.module.scss';

import type { PropsWithChildren } from 'react';
import { ObjectResponse } from 'entities/Objects/types/types';

interface ObjectDetailProps {
 className?: string;
 obj: ObjectResponse;
}

export function ObjectDetail(props: PropsWithChildren<ObjectDetailProps>) {
 const { className,obj,children } = props;

 return (
<div className={classNames(cls.ObjectDetail,{},[className])}>
    <b>Информация по всем узлам объекта {obj.name}</b>
    {children}
</div>
 );
}