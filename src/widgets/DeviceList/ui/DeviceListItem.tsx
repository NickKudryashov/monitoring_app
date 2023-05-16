import classNames from "shared/lib/classNames/classNames";
import cls from "./DeviceListItem.module.scss";

import { PropsWithChildren, useCallback, useState } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import {  categoriesAllRequest, categoryDeleteRequest, CategoryItem, CategoryListItem, categorySlice, getCategoryByID } from "entities/Category";
import { ObjectItem, ObjectListItem, objectsAllRequest, objectsDelRequest, objectSlice } from "entities/Objects";
import { heatNodeAllRequest, HeatNodeListItem, HeatNodeResponse } from "entities/HeatNodes";
import { getDevices, HeatDevice, HeatDeviceListItem, heatDeviceSlice } from "entities/Heatcounters";
import { deviceListSlice } from "../reducers/DeviceListReducer";
import { heatNodeSlice } from "entities/HeatNodes/reducers/reducers";
import { AddCategory } from "features/AddCategory";
import { EditCategory } from "features/EditCategory/ui/EditCategory";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import DottedIcon from "shared/assets/icons/dropdownDotsIcon.svg";
import { EditObject } from "features/EditObject";
import { findChildrens } from "entities/Category/lib/helpers";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { ElectroNodeData, ElectroNodeListItem, fetchElectroNodes } from "entities/ElectroNodes";
import { electroNodesActions } from "entities/ElectroNodes/model/slice/electroNodes";
import { ElectroDeviceListItem, electroDeviceActions, fetchElectroDevices } from "entities/ElectroDevice";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";

interface DeviceListItemProps {
 className?: string;
 parentID?:number;
 onClick?:()=>void;
}

export function DeviceListItem(props: PropsWithChildren<DeviceListItemProps>) {
    const { className,parentID,onClick } = props;
    const {categories} = useSelector((state:StateSchema)=>state.category);
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const [openModal,setOpenModal] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState<CategoryItem>(null);
    const [selectedObject,setSelectedObject] = useState<ObjectItem>(null);
    const [openObjModal,setOpenObjModal] = useState(false);
    const dispatch = useAppDispatch();
    const categoryClickHandler = (cat:CategoryItem)=>{
        dispatch(categoriesAllRequest());
        dispatch(heatDeviceSlice.actions.unselectdevice());
        dispatch(categorySlice.actions.openCat(cat.id));
        dispatch(categorySlice.actions.closeAllCatsExceptSelected(cat));
        dispatch(deviceListSlice.actions.setCategory(cat));
        dispatch(objectSlice.actions.closeAllObj());
        onClick();

    };
    const objectClickHandler = (obj:ObjectItem) => {
        dispatch(objectsAllRequest());
        dispatch(heatDeviceSlice.actions.unselectdevice());
        dispatch(getDevices());
        dispatch(heatNodeAllRequest());
        dispatch(categorySlice.actions.closeAllCatsExceptSelectedWithoutParent(getCategoryByID(categories,obj.category)));
        dispatch(objectSlice.actions.closeAllObjExceptSelected(obj));
        dispatch(heatNodeSlice.actions.closeNodeForObject(obj.id));
        dispatch(deviceListSlice.actions.setObject(obj));
        onClick();
    };
    const heatDeviceClickHandler = (device:HeatDevice)=>{
        dispatch(getDevices());
        dispatch(heatDeviceSlice.actions.selectdevice(device));
        dispatch(deviceListSlice.actions.setHeatDevice(device));
        dispatch(heatNodeSlice.actions.unselectHeatNode());
        dispatch(electroDeviceActions.unselectdevice());
        onClick();
    };

    const heatNodeClickHandler = (node:HeatNodeResponse)=>{
        dispatch(getDevices());
        dispatch(heatDeviceSlice.actions.unselectdevice());
        dispatch(electroNodesActions.unselectElectroNode());
        dispatch(heatNodeAllRequest());
        dispatch(deviceListSlice.actions.setHeatNode(node));
        dispatch(heatNodeSlice.actions.selectHeatNode(node));
        dispatch(electroNodesActions.closeNodeForObject(node.user_object));
        onClick();
    };

    const electroNodeClickHandler = (node:ElectroNodeData)=>{
        dispatch(fetchElectroDevices());
        dispatch(electroDeviceActions.unselectdevice());
        dispatch(fetchElectroNodes());
        dispatch(heatNodeSlice.actions.closeNodeForObject(node.user_object));
        dispatch(deviceListSlice.actions.setElectroNode(node));
        dispatch(electroNodesActions.selectElectroNode(node));
        dispatch(heatNodeSlice.actions.unselectHeatNode());
        onClick();
    };

    const electroDeviceClickHandler = (device:TopLevelElectroDevice)=>{
        dispatch(fetchElectroDevices());
        dispatch(electroDeviceActions.selectdevice(device));
        dispatch(heatDeviceSlice.actions.unselectdevice());
        dispatch(deviceListSlice.actions.setElectroDevice(device));
        onClick();
    };

    const categoryMenuClickHandler = (element:CategoryItem)=>{
        setOpenModal(true);
        setSelectedCategory(element);
    };
    const objectEditHandler = (element:ObjectItem)=>{
        setOpenObjModal(true);
        setSelectedObject(element);
    };
    const objectDeleteHandler=(element:ObjectItem)=>{
        dispatch(objectsDelRequest(element.id));
        dispatch(getDevices());
        dispatch(heatNodeAllRequest());
    };
    const categoryDeleteHandler=(element:CategoryItem)=>{
        const toDelete = findChildrens(categories,element.id);
        dispatch(categoriesAllRequest());
        dispatch(categoryDeleteRequest(toDelete));
        dispatch(objectsAllRequest());
        dispatch(getDevices());
        dispatch(heatNodeAllRequest());
    };

    return (
        <div className={classNames(cls.DeviceListItem,{},[className])}>
            {categories.map(element=>element.parentID===parentID  &&
            <div key={element.id}>
                <div className={cls.textWithIcon}>
                    <CategoryListItem  
                        className={cls.items}
                        onCategoryClickHandler={categoryClickHandler} 
                        id={element.id} 
                        Component={()=>
                            <DropdownMenu
                                Icon={DottedIcon}
                                items={[
                                    {text:"Редактировать категорию",onClick:()=>categoryMenuClickHandler(element)},
                                    {text:"Удалить категорию",onClick:()=>categoryDeleteHandler(element)},
                                ]}
                            />
                        }
                    >
                        {objects.map((object)=>object.category===element.id  &&
                        <ObjectListItem 
                            className={cls.DeviceListItem} 
                            key={object.id} 
                            onObjectClick={objectClickHandler} 
                            id={object.id} 
                            Component={()=>
                                <DropdownMenu
                                    Icon={DottedIcon}
                                    items={[
                                        {text:"Редактировать объект",onClick:()=>objectEditHandler(object)},
                                        {text:"Удалить объект",onClick:()=>objectDeleteHandler(object)},
                                    ]}
                                />}>
                            <HeatNodeListItem  onNodeClick={(node:HeatNodeResponse)=>heatNodeClickHandler(node)} object_id={object.id}>
                                <HeatDeviceListItem onDeviceClick={(device:HeatDevice) =>heatDeviceClickHandler(device)} objectID={object.id}/>
                            </HeatNodeListItem>
                            <ElectroNodeListItem object_id={object.id} onNodeClick={electroNodeClickHandler}>
                                <ElectroDeviceListItem objectID={object.id} onDeviceClick={electroDeviceClickHandler}  />
                            </ElectroNodeListItem>
                        </ObjectListItem>)}
                        <DeviceListItem onClick={onClick} parentID={element.id}/>
                    </CategoryListItem>
                </div>
                {openModal && <EditCategory isOpen={openModal} onClose={()=>setOpenModal(false)} category={selectedCategory} />}
                {openObjModal && <EditObject object={selectedObject} isOpen={openObjModal} onClose={()=>setOpenObjModal(false)} />}

            </div>
            )}
        </div>
    ); 
}