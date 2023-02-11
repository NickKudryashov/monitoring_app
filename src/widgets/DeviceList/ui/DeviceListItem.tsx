import classNames from 'shared/lib/classNames/classNames';
import cls from './DeviceListItem.module.scss';

import type { PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { categoryReducer, CategoryResponse, categorySlice } from 'entities/Category';
import { ObjectListItem, ObjectResponse, objectSlice } from 'entities/Objects';
import { HeatNodeListItem, HeatNodeResponse } from 'entities/HeatNodes';
import { HeatDeviceListItem } from 'entities/Heatcounters';
import { deviceListSlice } from '../reducers/DeviceListReducer';
interface DeviceListItemProps {
 className?: string;
 parentID?:number;
}

export function DeviceListItem(props: PropsWithChildren<DeviceListItemProps>) {
 const { className,parentID=0 } = props;
 const {categories} = useAppSelector(state=>state.categoryReducer)
 const {objects} = useAppSelector(state=>state.objectReducer)
 const {currentDevice,currentNode,currentObject} = useAppSelector(state=>state.deviceListReducer)
 const dispatch = useAppDispatch()
 const categoryClickHandler = (cat:CategoryResponse)=>{
    dispatch(categorySlice.actions.expand(cat.id))
    dispatch(deviceListSlice.actions.setCategory(cat))
 }
 return (
<div className={classNames(cls.DeviceListItem,{},[className])}>
    {categories.map(element=>element.parentID===parentID && 
    <div>
        <b onClick={()=>categoryClickHandler(element)}>{element.name}</b>
        {element.expanded && 
        <DeviceListItem parentID={element.id}/>
        }
    </div>
    )}
    {/* {objects.map((object)=>object.category===parentID && <b>{object.name}</b>)} */}
    {objects.map((object)=>object.category===parentID && 
        <ObjectListItem onObjectClick={(obj:ObjectResponse)=>dispatch(deviceListSlice.actions.setObject(obj))} id={object.id}>
                <HeatNodeListItem  onNodeClick={(node:HeatNodeResponse)=>dispatch(deviceListSlice.actions.setNode(node))} object_id={object.id}>
                    <HeatDeviceListItem objectID={object.id}/>
                </HeatNodeListItem>
        </ObjectListItem>)}
</div>
 );
}