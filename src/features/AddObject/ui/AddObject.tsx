// import classNames from 'shared/lib/classNames/classNames';
// import cls from './AddObject.module.scss';

import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { objectsAllRequest } from "entities/Objects";
import { PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";
import $api from "shared/api";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import { AppButon } from "shared/ui/AppButton/AppButton";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { Modal } from "shared/ui/Modal/Modal";
import cls from "./AddObject.module.scss";
interface AddObjectProps {
 className?: string;
 onClose?:()=>void;
 isOpen?:boolean;
}

export function AddObject(props: PropsWithChildren<AddObjectProps>) {
    const { className,isOpen,onClose } = props;
    const {categories} = useSelector((state:StateSchema)=>state.category);
    const [selectedCat,setSelectedCat] = useState("");
    const [name,setName] = useState("");
    const dispatch = useAppDispatch();
    

    const addHandler = async ()=> {
        const body = {
            name,
            category:Number(selectedCat)
        };
        await $api.post("objects/add",body);
        dispatch(objectsAllRequest());
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={cls.AddObject}>
                Добавить новый объект:
                <AppInput theme={InputThemes.OUTLINE} value={name} onChange={e=>setName(e.target.value)} placeholder="Название объекта"/>
                <select value={selectedCat} onChange={e=>setSelectedCat(e.target.value)}>
                    {categories.map(cat=><option key={cat.id}  value={cat.id}>{cat.name}</option>)}
                </select>
                <AppButon onClick={addHandler}>OK</AppButon>
            </div>
        </Modal>
    );
}