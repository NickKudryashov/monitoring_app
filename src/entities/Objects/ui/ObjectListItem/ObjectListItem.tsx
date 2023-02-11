import classNames from 'shared/lib/classNames/classNames';
import cls from './ObjectListItem.module.scss';
import type { ObjectResponse } from 'entities/Objects/types/types';
import type { PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { objectSlice } from 'entities/Objects/reducers/reducers';

interface ObjectListItemProps {
 className?: string;
 id:number;
 onObjectClick:(obj:ObjectResponse)=>void;
}

export function ObjectListItem(props: PropsWithChildren<ObjectListItemProps>) {
 const { className,children,id,onObjectClick } = props;
 const {objects} = useAppSelector(state=>state.objectReducer)
 const dispatch = useAppDispatch()
 const onClickHandler = (obj:ObjectResponse) => {
    dispatch(objectSlice.actions.expand(obj.id))
    // dispatch(objectSlice.actions.openObj(obj.id))
    onObjectClick(obj)
 }
 return (
<div className={classNames(cls.ObjectListItem,{},[className])}>
 {objects.map(obj=>obj.id===id && 
    <div className={cls.nested}>
        <b onClick={e=>onClickHandler(obj)}>{obj.name}</b>
        {obj.expanded && children}
    </div>
    )}
</div>
 );
}