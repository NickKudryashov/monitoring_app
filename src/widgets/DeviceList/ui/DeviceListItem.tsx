import classNames from "shared/lib/classNames/classNames";
import cls from "./DeviceListItem.module.scss";

import type { PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import {  categoriesAllRequest, CategoryItem, CategoryListItem, categorySlice } from "entities/Category";
import { ObjectItem, ObjectListItem, objectsAllRequest, objectSlice } from "entities/Objects";
import { heatNodeAllRequest, HeatNodeListItem, HeatNodeResponse } from "entities/HeatNodes";
import { getDevices, HeatDevice, HeatDeviceListItem } from "entities/Heatcounters";
import { deviceListSlice } from "../reducers/DeviceListReducer";
import { heatNodeSlice } from "entities/HeatNodes/reducers/reducers";
interface DeviceListItemProps {
 className?: string;
 parentID?:number;
}

export function DeviceListItem(props: PropsWithChildren<DeviceListItemProps>) {
    const { className,parentID } = props;
    const {categories} = useAppSelector(state=>state.categoryReducer);
    const {objects} = useAppSelector(state=>state.objectReducer);
    const dispatch = useAppDispatch();
    const categoryClickHandler = (cat:CategoryItem)=>{
        dispatch(categoriesAllRequest());
        dispatch(categorySlice.actions.openCat(cat.id));
        dispatch(categorySlice.actions.closeAllCatsExceptSelected(cat));
        dispatch(deviceListSlice.actions.setCategory(cat));
        dispatch(objectSlice.actions.closeAllObjByCategoryId(cat.id));

    };
    const objectClickHandler = (obj:ObjectItem) => {
        dispatch(objectsAllRequest());
        dispatch(getDevices());
        dispatch(heatNodeAllRequest());
        dispatch(objectSlice.actions.closeAllObjExceptSelected(obj));
        dispatch(heatNodeSlice.actions.closeNodeForObject(obj.id));
        dispatch(deviceListSlice.actions.setObject(obj));
    };
    const heatDeviceClickHandler = (device:HeatDevice)=>{
        dispatch(getDevices());
        dispatch(deviceListSlice.actions.setDevice(device));
    };

    const heatNodeClickHandler = (node:HeatNodeResponse)=>{
        dispatch(getDevices());
        dispatch(heatNodeAllRequest());
        dispatch(deviceListSlice.actions.setNode(node));
    };
    // Описать клик хэндлер по принципу:
    // Клик на прибор - ничего ( или отображение как есть)
    // Клик на ноду - закрывает другие ноды если они открыты (пока их нет) и открывает ноду если она закрыта
    // Клик на объект - свернуть все ноды (и объекты в данной категории) и открывает объект если он закрыт
    // Клик на категорию - свернуть все нижележащие и/или открытые категории и открыть категорию если она закрыта
    return (
        <div className={classNames(cls.DeviceListItem,{},[className])}>
            {categories.map(element=>element.parentID===parentID  &&
            <div key={element.id}>
                <CategoryListItem onCategoryClickHandler={categoryClickHandler} id={element.id}>
                    {objects.map((object)=>object.category===element.id  &&
                        <ObjectListItem key={object.id} onObjectClick={objectClickHandler} id={object.id}>
                            <HeatNodeListItem  onNodeClick={(node:HeatNodeResponse)=>heatNodeClickHandler(node)} object_id={object.id}>
                                <HeatDeviceListItem onDeviceClick={(device:HeatDevice) =>heatDeviceClickHandler(device)} objectID={object.id}/>
                            </HeatNodeListItem>
                        </ObjectListItem>)}
                    <DeviceListItem parentID={element.id}/>

                </CategoryListItem>
            </div>
            )}
            {/* {objects.map((object)=>object.category===parentID && 
            <ObjectListItem key={object.id} onObjectClick={(obj:ObjectResponse)=>dispatch(deviceListSlice.actions.setObject(obj))} id={object.id}>
                <HeatNodeListItem  onNodeClick={(node:HeatNodeResponse)=>dispatch(deviceListSlice.actions.setNode(node))} object_id={object.id}>
                    <HeatDeviceListItem objectID={object.id}/>
                </HeatNodeListItem>
            </ObjectListItem>)} */}
        </div>
    ); 
}