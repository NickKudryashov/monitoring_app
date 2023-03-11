import classNames from "shared/lib/classNames/classNames";
import cls from "./EditCategory.module.scss";

import { PropsWithChildren, useState } from "react";
import $api from "shared/api";
import { categoriesAllRequest, CategoryItem } from "entities/Category";
import { Modal } from "shared/ui/Modal/Modal";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { AppButon } from "shared/ui/AppButton/AppButton";
import { useAppDispatch } from "shared/hooks/hooks";

interface EditCategoryProps {
 className?: string;
 category: CategoryItem;
 onClose?:()=>void;
 isOpen?:boolean;
}

export function EditCategory(props: PropsWithChildren<EditCategoryProps>) {
    const { className,category,isOpen,onClose } = props;
    const url = `category/${category.id}`;
    const [name,setName] = useState(category.name);
    const req = $api.put;
    const dispatch = useAppDispatch();

    const addHandler = async ()=>{
        const body = {
            name,
            parentID:category.parentID,
            id:category.id
        };
        await req(url,body);
        dispatch(categoriesAllRequest());
        onClose();
    };

    return (
        <div className={classNames(cls.EditCategory,{},[className])}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className={cls.AddCategory}>
                    Редактировать категорию:
                    <AppInput theme={InputThemes.OUTLINE} value={name} onChange={e=>setName(e.target.value)} placeholder="Название категории"/>
                    <AppButon onClick={addHandler}>OK</AppButon>
                </div>
            </Modal>
        </div>
    );
}