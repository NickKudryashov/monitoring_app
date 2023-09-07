import classNames from "shared/lib/classNames/classNames";
import cls from "./DeviceListItem.module.scss";

import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import {  categoriesAllRequest, categoryDeleteRequest, CategoryItem, CategoryListItem, categorySlice, getCategoryByID } from "entities/Category";
import { ObjectItem, ObjectListItem, objectReducer, objectsAllRequest, objectsDelRequest, objectSlice } from "entities/Objects";
import { getDevices, HeatDevice, HeatDeviceDetailView, HeatDeviceListItem, heatDeviceSlice } from "entities/Heatcounters";
import { deviceListSlice } from "../reducers/DeviceListReducer";
import { EditCategory } from "features/EditCategory/ui/EditCategory";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import DottedIcon from "shared/assets/icons/dropdownDotsIcon.svg";
import { EditObject } from "features/EditObject";
import { findChildrens } from "entities/Category/lib/helpers";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { ElectroCounterDeviceDetail, ElectroDeviceListItem, electroDeviceActions, fetchElectroDevices } from "entities/ElectroDevice";
import { TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { PumpDevListItem, fetchPumpDevice } from "entities/PumpDevice";
import { PumpDeviceData } from "entities/PumpDevice/model/types/pumpDevice";
import { pumpDeviceActions } from "entities/PumpDevice/model/slice/pumpDevice";
import { ListItem, ObjectSubCategoryType, fetchByObjId, objSubCategoryActions } from "entities/ObjectSubCategory";
import { useNavigate } from "react-router-dom";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import $api from "shared/api";

interface DeviceListItemProps {
 className?: string;
 parentID?:number;
 onSubCatMove?:()=>void;
 onClick?:()=>void;
}

export function DeviceListItem(props: PropsWithChildren<DeviceListItemProps>) {
    const { className,parentID,onClick=()=>{console.log("ff");},onSubCatMove } = props;
    const {categories} = useSelector((state:StateSchema)=>state.category);
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const [openModal,setOpenModal] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState<CategoryItem>(null);
    const {electrocounter,heatcounters,pumps,current} = useSelector((state:StateSchema)=>state.subCatPage);
    const {entities:subcatEntities,ids} = useSelector((state:StateSchema)=>state.objSubCat);
    // const [selectedObject,setSelectedObject] = useState<ObjectItem>(null);
    const {currentObject:selectedObject,currentSubcat,objectThroughSubcat} = useSelector((state:StateSchema)=>state.deviceList);
    const {entities} = useSelector((state:StateSchema)=>state.heatDevices);
    const [openObjModal,setOpenObjModal] = useState(false);
    const navigate = useNavigate();
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
    useEffect(()=>{
        if (selectedObject) {
            if (!currentSubcat) {
                dispatch(fetchByObjId(selectedObject.id));

            }
            const reqId = objects.filter((el)=>el.id===selectedObject.id)[0];
            dispatch(deviceListSlice.actions.setObject(reqId));
            dispatch(deviceListSlice.actions.setProxyObject(reqId));
        }
        if (currentSubcat) {
            const reqId = objects.filter((el)=>el.id===subcatEntities[currentSubcat]?.user_object)[0];
            if (!selectedObject){
                dispatch(deviceListSlice.actions.setProxyObject(reqId));
                dispatch(deviceListSlice.actions.setObject(reqId));
            }
            else if (reqId.id===selectedObject.id){
                dispatch(deviceListSlice.actions.setProxyObject(reqId));
                dispatch(deviceListSlice.actions.setObject(reqId));
            }
            // onSubCatMove();
            // dispatch(deviceListSlice.actions.setSubcat(currentSubcat));
        }
    },[currentSubcat, dispatch, selectedObject]);
    const objectClickHandler = (obj:ObjectItem) => {
        // dispatch(objectsAllRequest());
        dispatch(fetchByObjId(obj.id));
        dispatch(heatDeviceSlice.actions.unselectdevice());
        dispatch(getDevices());
        for (const dd of ids) {
            localStorage.removeItem("subcategory_"+dd);
        }
        dispatch(categorySlice.actions.closeAllCatsExceptSelectedWithoutParent(getCategoryByID(categories,obj.category)));
        dispatch(objectSlice.actions.closeAllObjExceptSelected(obj));
        dispatch(deviceListSlice.actions.setObject(obj));
        onClick();
    };
    const heatDeviceClickHandler = useCallback((device:HeatDevice)=>{
        dispatch(getDevices());
        dispatch(heatDeviceSlice.actions.selectdevice(device));
        dispatch(deviceListSlice.actions.setHeatDevice(device));
        dispatch(electroDeviceActions.unselectdevice());
        onClick();
    },[dispatch, onClick]);



    const electroDeviceClickHandler = useCallback((device:TopLevelElectroDevice)=>{
        dispatch(fetchElectroDevices());
        console.log("сработка фетчинга из девай лист айтема");
        dispatch(electroDeviceActions.selectdevice(device));
        dispatch(heatDeviceSlice.actions.unselectdevice());
        dispatch(deviceListSlice.actions.setElectroDevice(device));
        onClick();
    },[dispatch, onClick]);

    const pumpDeviceClickHandler = useCallback((device:PumpDeviceData)=>{
        dispatch(fetchPumpDevice());
        dispatch(deviceListSlice.actions.setPumpDevice(device));
        dispatch(electroDeviceActions.unselectdevice());
        dispatch(heatDeviceSlice.actions.unselectdevice());
        // dispatch(pumpDeviceActions.expandDev(device.id));
        // dispatch(objSubCategoryActions.changeExpand(undefined));
        onClick();
    },[dispatch, onClick]);


    const categoryMenuClickHandler = (element:CategoryItem)=>{
        setOpenModal(true);
        setSelectedCategory(element);
    };
    const objectEditHandler = (element:ObjectItem)=>{
        setOpenObjModal(true);
    };
    const objectDeleteHandler=(element:ObjectItem)=>{
        dispatch(objectsDelRequest(element.id));
        dispatch(getDevices());
    };
    const categoryDeleteHandler=(element:CategoryItem)=>{
        const toDelete = findChildrens(categories,element.id);
        dispatch(categoriesAllRequest());
        dispatch(categoryDeleteRequest(toDelete));
        dispatch(objectsAllRequest());
        dispatch(getDevices());
    };

    const onSubClick =useCallback((sub:ObjectSubCategoryType)=>{
        dispatch(deviceListSlice.actions.setSubcat(sub.id));
        dispatch(deviceListSlice.actions.setPumpDevice(undefined));
        dispatch(electroDeviceActions.unselectdevice());
        dispatch(heatDeviceSlice.actions.unselectdevice());
        // dispatch(objSubCategoryActions.changeExpand(undefined));
    },[dispatch]);

    //не перерисовывается список и возможно карточки
    const onMove = ()=>{
        currentSubcat ? dispatch(fetchByObjId(subcatEntities[currentSubcat].user_object)) : dispatch(fetchByObjId(selectedObject.id));
        dispatch(fetchPumpDevice());
        dispatch(fetchElectroDevices());
        dispatch(getDevices());
        dispatch(objectsAllRequest());
        const tempInstance = selectedObject ? selectedObject.id : subcatEntities[currentSubcat].user_object;
        const objArr = objects.filter((el)=>el.id===tempInstance);
        dispatch(deviceListSlice.actions.setProxyObject(objArr[0]));
        dispatch(deviceListSlice.actions.setObject(objArr[0]));
        onSubCatMove();
        // dispatch(deviceListSlice.actions.setSubcat(currentSubcat));
    };
    const onMoveHandler = (obj:ObjectItem) => {
    };

    const renderDevs = useCallback((objID:number,catID:number)=>(
        <div>
            {localStorage.getItem("subcategory_"+catID) && 
                <HeatDeviceListItem catID={catID}  onDeviceClick={heatDeviceClickHandler} objectID={objID}/>}
            {localStorage.getItem("subcategory_"+catID) && 
                <ElectroDeviceListItem catID={catID} onDeviceClick={electroDeviceClickHandler}  objectID={objID}/>}
            {localStorage.getItem("subcategory_"+catID) && 
                <PumpDevListItem catID={catID} onDeviceClick={pumpDeviceClickHandler}  objectID={objID} />}
        </div>
    ),[electroDeviceClickHandler, heatDeviceClickHandler, pumpDeviceClickHandler]);
    

    const addSubcatHandler = async (object:ObjectItem)=>{
        const response = await $api.post<ObjectSubCategoryType>("subcategory/create",{name:"Новая категория",user_object:object.id});
        dispatch(objectsAllRequest());
        dispatch(fetchByObjId(object.id));

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
                                        {text:"Добавить подпапку",onClick:()=>addSubcatHandler(object)},
                                    ]}
                                />}> 
                            {
                                selectedObject && selectedObject?.pids_with_ids && selectedObject?.pids_with_ids["0"] && 
                                selectedObject?.pids_with_ids["0"].map((id)=>
                                    <div  key={id}>
                                        <ListItem onClick={()=>onSubClick(subcatEntities[id])}  objID={selectedObject.id} renderCallback={renderDevs} pidMapper={selectedObject?.pids_with_ids} catID={id} onMove={()=>onMove()} />
                                    </div>
                                )
                            }
                            {
                                !selectedObject && currentSubcat && objectThroughSubcat && objectThroughSubcat?.pids_with_ids["0"] && 
                                objectThroughSubcat?.pids_with_ids["0"].map((id)=>
                                    <div key={id}>
                                        <ListItem onClick={()=>onSubClick(subcatEntities[id])}  objID={objectThroughSubcat.id} onMove={()=>onMove()} renderCallback={renderDevs} pidMapper={objectThroughSubcat?.pids_with_ids}  catID={id} />
                                    </div>
                                )
                            }
                            {/* <PumpDevListItem objectID={object.id} onDeviceClick={pumpDeviceClickHandler} /> */}
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