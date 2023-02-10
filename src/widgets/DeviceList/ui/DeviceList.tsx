import classNames from 'shared/lib/classNames/classNames';
import cls from './DeviceList.module.scss';
import { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { categoriesAllRequest } from 'entities/Category';
import { objectsAllRequest } from 'entities/Objects';
import { DeviceListItem } from './DeviceListItem';
import { heatNodeAllRequest } from 'entities/HeatNodes';
interface DeviceListProps {
 className?: string;
 parentID?:number;
}

export function DeviceList(props: PropsWithChildren<DeviceListProps>) {
    const {className,parentID=0} = props
    const dispatch = useAppDispatch()
    const {categories} = useAppSelector(state=>state.categoryReducer)
    const {objects} = useAppSelector(state=>state.objectReducer)
    useEffect(()=>{
      dispatch(categoriesAllRequest())
      dispatch(objectsAllRequest())
      dispatch(heatNodeAllRequest())
    },[])
    return (
        <div className={classNames(cls.DeviceList,{},[className])}>
            {/* {categories.map((category)=><div>{category.name}</div>)} */}
            <DeviceListItem parentID={0} />
        </div>
    );
    }