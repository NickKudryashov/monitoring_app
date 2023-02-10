import classNames from 'shared/lib/classNames/classNames';
import cls from './DeviceListItem.module.scss';

import type { PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { categoryReducer, categorySlice } from 'entities/Category';
import { ObjectListItem } from 'entities/Objects';
interface DeviceListItemProps {
 className?: string;
 parentID?:number;
}

export function DeviceListItem(props: PropsWithChildren<DeviceListItemProps>) {
 const { className,parentID=0 } = props;
 const {categories} = useAppSelector(state=>state.categoryReducer)
 const {objects} = useAppSelector(state=>state.objectReducer)
 const {heatNodes} = useAppSelector(state=>state.heatNodeReducer)
 const dispatch = useAppDispatch()
 let cats:number[] = []
 return (
<div className={classNames(cls.DeviceListItem,{},[className])}>
    {categories.map(element=>element.parentID===parentID && 
    <div>
        <b onClick={()=>dispatch(categorySlice.actions.expand(element.id))}>{element.name}</b>
        {element.expanded && cats.push(element.id) &&
        <DeviceListItem parentID={element.id}/>
        }
    </div>
    )}
    {/* {objects.map((object)=>object.category===parentID && <b>{object.name}</b>)} */}
    {objects.map((object)=>object.category===parentID && <ObjectListItem id={object.id}>{heatNodes.map(el=>el.user_object===object.id && <b>{el.name}</b>)}</ObjectListItem>)}
</div>
 );
}