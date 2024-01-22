import classNames from "shared/lib/classNames/classNames";
import { memo, useEffect, useState } from "react";
import cls from "./ListItem.module.scss";

import type { DragEvent, PropsWithChildren, ReactNode } from "react";
import { ObjSubcategoryAdapter, objSubCatSelector, objSubCatSlice, objSubCategoryActions, objSubCategoryReducer } from "entities/ObjectSubCategory/model/slice/subcatSlice";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePathAuth, RoutePathPublic } from "shared/config/RouteConfig/RouteConfig";
import { Modal } from "shared/ui/Modal/Modal";
import $api from "shared/api";
import { subCatPageActions } from "pages/SubcartegoryPage";
import { ObjectSubCategoryType } from "entities/ObjectSubCategory/model/types/ObjectSubCategorySchema";
import { editSubCat } from "entities/ObjectSubCategory/model/actions/fetchSubCats";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import DottedIcon from "shared/assets/icons/dropdownDotsIcon.svg";
import { text } from "stream/consumers";

interface ParentMapper {
    [id : number]:number[];
}

interface ListItemProps {
 className?: string;
 catID:number;
 pidMapper:ParentMapper;
 objID:number;
 onMove:()=>void;
 onClick:(instance:ObjectSubCategoryType)=>void;
 renderCallback:(objID:number,id:number)=>ReactNode
//  objID:number;
}
const editor = async (catID:number,body:any,callback:()=>void)=>{
    const response = await $api.post("subcategory/"+catID+"/edit",body);
    if (response.status===200) {
        callback();
    }
};



export const ListItem = memo((props: PropsWithChildren<ListItemProps>) => {
    const { className,catID,pidMapper,children,objID,renderCallback,onMove,onClick } = props;
    const name= useSelector((state:StateSchema)=>objSubCatSelector?.selectById(state,catID))?.name;
    const {isLoading,lastExpandedId,selectedItemToDrop} = useSelector((state:StateSchema)=>state.objSubCat);
    const {entities} = useSelector((state:StateSchema)=>state.objSubCat);
    const [editWindow,setEditWindow] = useState(false);
    const [namec,sateNamec] = useState(entities[catID]?.name);
    console.log("Рендерится компонент сабкат лист айтема: ",entities[catID]?.name);
    const dispatch = useAppDispatch();
    const checker = (a:boolean,b:boolean)=>(a || b);
    const moving = async ()=>{
        const response = await $api.get<ObjectSubCategoryType>("subcategory/"+catID+"/detail");
        dispatch(objSubCategoryActions.update(response.data));
        onMove();
    };
    const callb = async ()=>{
        const response = await $api.get<ObjectSubCategoryType>("subcategory/"+catID+"/detail");
        dispatch(objSubCategoryActions.update(response.data));
    };
    const deleter = async (catID:number,callback:()=>void)=>{
        const response = await $api.post("subcategory/"+catID+"/delete");
        if (response.status===200) {
            dispatch(objSubCategoryActions.remove(response.data));
        }
        callback();
    };
    function onDragStartHandler(e: DragEvent<HTMLAnchorElement>, cid: number): void {
        // console.log("drag start, id: ",cid);
        dispatch(objSubCatSlice.actions.selectCard(catID));
        // console.log("drag start, selected id: ",selectedItemToDrop);
    }

    function onDragEndHandler(e: DragEvent<HTMLAnchorElement>, cid: number): void {
        // console.log("drag end, id " ,cid);
    }

    function onDropHandler(e: DragEvent<HTMLAnchorElement>, cid: number): void {
        e.preventDefault();
        // console.log("on drop id ",cid);
        // console.log("on drop state  ",selectedItemToDrop);
        dispatch(editSubCat({cat_id:selectedItemToDrop,data:{parent:cid}}));
        onMove();
    }
    function onDragLeave(e: DragEvent<HTMLAnchorElement>, cid: number): void {
        // console.log("on drag leave ",cid);
    }

    function onDragOver(e: DragEvent<HTMLAnchorElement>, cid: number): void {
        e.preventDefault();
        // console.log("on drag over, id",cid);
    }


    return (
        <div
            className={classNames(cls.ListItem,{},[className])}
        >
            <div className={cls.linkWithIcon}>
                <AppLink 
                    className={localStorage.getItem("subcategory_"+catID) ? cls.selected : cls.unselected} 
                    to={RoutePathAuth.subcat+catID} 
                    onClick={()=>{
                        dispatch(objSubCategoryActions.changeExpand(catID));
                        onClick(entities[catID]);
                        console.log("клик на ссылку");
                    }}
                    draggable={true}
                    onDragStart={(e)=>onDragStartHandler(e,catID)}
                    onDragEnd={(e)=>onDragEndHandler(e,catID)}
                    onDragLeave={(e)=>onDragLeave(e,catID)}
                    onDragOver={(e)=>onDragOver(e,catID)}
                    onDrop={(e)=>onDropHandler(e,catID)}
                >
                    {name}
                </AppLink>
                {/* <DottedIcon onClick={()=>setEditWindow(true)}/> */}
                {/* <DropdownMenu
                    Icon={DottedIcon}
                    items={[{text:"Настройки",onClick:()=>setEditWindow(true)}]}
            
                /> */}
            </div>
            <Modal onClose={()=>setEditWindow(false)} isOpen={editWindow}>
                <p>Введите новое имя: </p>
                <input value={namec} onChange={(msg)=>sateNamec(msg.target.value)} />
                <button onClick={()=>editor(catID,{name:namec},callb)} >Подтвердить</button>
                <button onClick={()=>deleter(catID,onMove)} >Удалить</button>
            </Modal>
            {
                pidMapper[catID]?.map(cat=> entities[cat] && localStorage.getItem("subcategory_"+catID) && 
                    <ListItem onClick={onClick}  onMove={onMove} renderCallback={renderCallback} objID={objID} key={cat} pidMapper={pidMapper} catID={entities[cat].id}/>    
                )

            }
            {renderCallback(objID,catID)}
        </div>
    );
});
