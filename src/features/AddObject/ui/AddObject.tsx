import { objectsAllRequest } from "@/entities/Objects";
import { PropsWithChildren, useState } from "react";
import $api from "@/shared/api";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { AppButon } from "@/shared/ui/AppButton/AppButton";
import { AppInput, InputThemes } from "@/shared/ui/AppInput/AppInput";
import { Modal } from "@/shared/ui/Modal/Modal";
import cls from "./AddObject.module.scss";
interface AddObjectProps {
    className?: string;
    onClose?: () => void;
    isOpen?: boolean;
}
const MOCK_TYPES = ["МЦД", "Детский сад", "Школы", "ИП"];
export function AddObject(props: PropsWithChildren<AddObjectProps>) {
    const { isOpen, onClose } = props;
    const [abonent, setSelectedAbonent] = useState("");
    const [address, setSelectedAdress] = useState("");
    const [name, setName] = useState("");
    const [objType, setObjType] = useState("");
    const dispatch = useAppDispatch();

    const addHandler = async () => {
        const body = {
            name,
            abonent,
            address,
        };
        await $api.post("objects/add", body);
        dispatch(objectsAllRequest());
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={cls.AddObject}>
                Добавить новый объект:
                <AppInput
                    theme={InputThemes.OUTLINE}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название объекта"
                />
                <AppInput
                    theme={InputThemes.OUTLINE}
                    value={address}
                    onChange={(e) => setSelectedAdress(e.target.value)}
                    placeholder="Адрес"
                />
                <AppInput
                    theme={InputThemes.OUTLINE}
                    value={abonent}
                    onChange={(e) => setSelectedAbonent(e.target.value)}
                    placeholder="Абонент"
                />
                <select
                    value={objType}
                    onChange={(e) => setObjType(e.target.value)}
                >
                    <option disabled value={""}>
                        {"Тип объекта:"}
                    </option>
                    {MOCK_TYPES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <AppButon onClick={addHandler}>OK</AppButon>
            </div>
        </Modal>
    );
}
