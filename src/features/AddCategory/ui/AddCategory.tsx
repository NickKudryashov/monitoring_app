// import classNames from 'shared/lib/classNames/classNames';
// import cls from './AddCategory.module.scss';

import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { categoriesAllRequest, categorySlice, getCategoryByID } from "entities/Category";
import { PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";
import $api from "shared/api";
import { useAppDispatch } from "shared/hooks/hooks";
import { AppButon } from "shared/ui/AppButton/AppButton";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { Modal } from "shared/ui/Modal/Modal";
import cls from "./AddCategory.module.scss";
interface AddCategoryProps {
 className?: string;
 onClose?:()=>void;
 isOpen?:boolean;
 edit?:boolean;
 id?:number;
}

export function AddCategory(props: PropsWithChildren<AddCategoryProps>) {
    const { className,isOpen,onClose,edit,id } = props;
    const {categories} = useSelector((state:StateSchema)=>state.category);
    const [selectedCat,setSelectedCat] = useState("");
    const [name,setName] = useState("");
    const url = "category/add";
    const req = $api.post;
    // if (edit){
    //     const currentCat = getCategoryByID(categories,id);
    //     const parent = getCategoryByID(categories,currentCat.parentID);
    //     console.log(currentCat);
    //     setName(currentCat.name);
    //     // setSelectedCat(parent.name);
   
    // }
    const dispatch = useAppDispatch();
    

    const addHandler = async ()=> {
        const body = {
            name,
            parentID:Number(selectedCat)
        };
        await req(url,body);
        dispatch(categoriesAllRequest());
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={cls.AddCategory}>
                Добавить новую категорию:
                <AppInput theme={InputThemes.OUTLINE} value={name} onChange={e=>setName(e.target.value)} placeholder="Название категории"/>
                <select value={selectedCat} onChange={e=>setSelectedCat(e.target.value)}>
                    <option value="0">Новая корневая категория</option>
                    {categories.map(cat=><option key={cat.id}  value={cat.id}>{cat.name}</option>)}
                </select>
                <AppButon onClick={addHandler}>OK</AppButon>
            </div>
        </Modal>
    );
}