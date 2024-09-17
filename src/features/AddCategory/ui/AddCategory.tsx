// import classNames from 'shared/lib/classNames/classNames';
// import cls from './AddCategory.module.scss';

import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { AppButon } from "@/shared/ui/AppButton/AppButton";
import { AppInput, InputThemes } from "@/shared/ui/AppInput/AppInput";
import { Modal } from "@/shared/ui/Modal/Modal";
import cls from "./AddCategory.module.scss";
import { objectsAllRequest } from "@/entities/Objects";
import {
    addNewSubcategory,
    getSubcategoryTypes,
} from "@/entities/ObjectSubCategory";
interface AddCategoryProps {
    className?: string;
    onClose?: () => void;
    isOpen?: boolean;
    edit?: boolean;
    id?: number;
}

export function AddCategory(props: PropsWithChildren<AddCategoryProps>) {
    const { className, isOpen, onClose, edit, id } = props;
    const { objects } = useSelector((state: StateSchema) => state.objects);
    const { data: subCatTypes } = getSubcategoryTypes();
    const [addSubcategory] = addNewSubcategory();
    const [selectedObj, setSelectedObj] = useState("0");
    const [selectedType, setSelectedType] = useState("0");
    const [name, setName] = useState("");
    const dispatch = useAppDispatch();
    console.log(subCatTypes);

    useEffect(() => {
        setSelectedObj("0");
        setSelectedType("0");
        if (!objects.length) {
            dispatch(objectsAllRequest());
        }
    }, []);

    const addHandler = async () => {
        addSubcategory({
            name: name,
            user_object: Number(selectedObj),
            subcategory_type: selectedType,
        });

        onClose && onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={cls.AddCategory}>
                Добавить новую подкатегорию:
                <AppInput
                    theme={InputThemes.OUTLINE}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название подкатегории"
                />
                <select
                    value={selectedObj}
                    onChange={(e) => setSelectedObj(e.target.value)}
                >
                    <option disabled value={"0"}>
                        {"Выберите объект"}
                    </option>
                    )
                    {objects &&
                        objects.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                </select>
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option disabled value={"0"}>
                        {"Выберите тип"}
                    </option>
                    )
                    {subCatTypes &&
                        Object.keys(subCatTypes).map((el) => (
                            <option key={el} value={el}>
                                {subCatTypes[el]}
                            </option>
                        ))}
                </select>
                <AppButon onClick={addHandler}>OK</AppButon>
            </div>
        </Modal>
    );
}
