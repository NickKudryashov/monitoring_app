import classNames from "@/shared/lib/classNames/classNames";
import cls from "./EditObject.module.scss";

import { PropsWithChildren, useState } from "react";
import $api from "@/shared/api";
import { Modal } from "@/shared/ui/Modal/Modal";
import { AppInput, InputThemes } from "@/shared/ui/AppInput/AppInput";
import { AppButon } from "@/shared/ui/AppButton/AppButton";
import { ObjectResponse } from "@/entities/Objects";

interface EditObjectProps {
    className?: string;
    object: ObjectResponse;
    onClose?: () => void;
    isOpen?: boolean;
}

export function EditObject(props: PropsWithChildren<EditObjectProps>) {
    const { className = "", object, isOpen, onClose } = props;
    const url = `objects/${object.id}`;
    const [name, setName] = useState(object.name);
    const req = $api.put;

    const addHandler = async () => {
        const body = {
            name,
            category: object.category,
            id: object.id,
        };
        await req(url, body);
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={classNames(cls.EditObject, {}, [className])}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className={cls.AddCategory}>
                    Редактировать объект:
                    <AppInput
                        theme={InputThemes.OUTLINE}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Название объекта"
                    />
                    <AppButon onClick={addHandler}>OK</AppButon>
                </div>
            </Modal>
        </div>
    );
}
