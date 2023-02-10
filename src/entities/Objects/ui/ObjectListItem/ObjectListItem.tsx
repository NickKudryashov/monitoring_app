import classNames from 'shared/lib/classNames/classNames';
import cls from './ObjectListItem.module.scss';

import type { PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { objectSlice } from 'entities/Objects/reducers/reducers';

interface ObjectListItemProps {
 className?: string;
 id:number;
}

export function ObjectListItem(props: PropsWithChildren<ObjectListItemProps>) {
 const { className,children,id } = props;
 const {objects} = useAppSelector(state=>state.objectReducer)
 const dispatch = useAppDispatch()
 return (
<div className={classNames(cls.ObjectListItem,{},[className])}>
 {objects.map(obj=>obj.id===id && 
    <div className={cls.nested}>
        <b onClick={e=>dispatch(objectSlice.actions.expand(obj.id))}>{obj.name}</b>
        {obj.expanded && children}
    </div>
    )}
</div>
 );
}