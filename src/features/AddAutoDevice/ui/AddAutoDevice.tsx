import classNames from "@/shared/lib/classNames/classNames";
import { memo, useEffect, useState } from "react";
import cls from "./AddAutoDevice.module.scss";
import type { PropsWithChildren } from "react";
import $api from "@/shared/api";
import { AppInput } from "@/shared/ui/AppInput/AppInput";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { Modal } from "@/shared/ui/Modal/Modal";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { getObjectSubcategoryData } from "@/entities/ObjectSubCategory";
import { getAutomaticDeviceTypes } from "@/entities/AutomaticDevice";

interface AddPumpDeviceProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

interface ConnectionInfoProps {
    ip: string;
    port: string;
    connection_type: string;
}

interface AddRequestProps {
    user_object: number;
    name: string;
    device_type: string;
    device_type_verbose_name: string;
    device_num: number;
    connection_info: ConnectionInfoProps;
    slave_adress: number;
    preset: number;
    subcategory: number;
    system_count?: number;
}

const AVAILABLE_TYPE_210 = "danfoss_ecl_210";
const AVAILABLE_TYPE_310 = "danfoss_ecl_310";
const AVAILABLE_TYPE_VERBOSE: Record<string, string> = {
    danfoss_ecl_210: "Danfoss ECL Comfort 210",
    danfoss_ecl_310: "Danfoss ECL Comfort 310",
};

const DeviceConnection = {
    TCP: "TCP",
    UDP: "UDP",
};

export const AddAutoDevice = memo(
    (props: PropsWithChildren<AddPumpDeviceProps>) => {
        const { className = "", isOpen, onClose, lazy = true } = props;
        const [devType, setDevType] = useState<string>("-1");
        const [sysCount, setSysCount] = useState<number>(1);
        const { objects } = useSelector((state: StateSchema) => state.objects);
        const [selectedSubcat, setSelectedSubcat] = useState("-1");
        const [dnum, setDnum] = useState("");
        const [name, setName] = useState("");
        const [selectedObj, setSelectedObj] = useState("-1");
        const { data, isLoading, refetch } = getObjectSubcategoryData(
            Number(selectedObj)
        );
        const { data: devTypes } = getAutomaticDeviceTypes();
        const [connectionProtocol, setConenctionProtocol] = useState(
            DeviceConnection.TCP
        );
        const [ip, setIp] = useState("");
        const [port, setPort] = useState("");
        const [slave, setSlave] = useState("");
        const [preset, setPreset] = useState("231");
        const dispatch = useAppDispatch();
        if (!isOpen && lazy) {
            return null;
        }
        objects.length === 0 && console.log("пусто");
        const addRequest = async (data: AddRequestProps) => {
            const response = await $api.post("automatic_device/add", data);
            if (response.status !== 200) {
                alert("Ошибка при добавлении прибора");
            }
        };

        const accept = async () => {
            const connection_info = {
                ip,
                port,
                connection_type: connectionProtocol,
            };
            const requestData: AddRequestProps = {
                user_object: Number(selectedObj),
                name,
                device_type: devType,
                device_type_verbose_name: AVAILABLE_TYPE_VERBOSE[devType],
                device_num: Number(dnum),
                connection_info,
                subcategory: Number(selectedSubcat),
                slave_adress: Number(slave),
                preset: Number(preset),
                system_count: sysCount,
            };
            const result = await addRequest(requestData);
            if (onClose) {
                onClose();
            }
        };

        return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                className={classNames(cls.AddAutoDevice, {}, [className])}
            >
                <VFlexBox>
                    <div className={cls.AddPumpDevice}>
                        <AppInput
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Имя прибора"
                        />
                        <AppInput
                            value={dnum}
                            onChange={(e) => setDnum(e.target.value)}
                            placeholder="Номер прибора"
                        />
                        <select
                            value={devType}
                            onChange={(e) => setDevType(e.target.value)}
                        >
                            <option disabled={true} value="-1">
                                Тип прибора
                            </option>
                            {devTypes &&
                                devTypes.map((el) => (
                                    <option key={el.devtype} value={el.devtype}>
                                        {el.verbose}
                                    </option>
                                ))}
                        </select>
                        <select
                            value={selectedObj}
                            onChange={(e) => setSelectedObj(e.target.value)}
                        >
                            <option disabled={true} value="-1">
                                Выберите объект
                            </option>
                            {objects.map((obj) => (
                                <option key={obj.id} value={obj.id}>
                                    {obj.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedSubcat}
                            onChange={(e) => setSelectedSubcat(e.target.value)}
                        >
                            <option disabled={true} value="-1">
                                Выберите подкатегорию
                            </option>
                            {data?.data.map(
                                (obj) =>
                                    obj.user_object === Number(selectedObj) && (
                                        <option key={obj.id} value={obj.id}>
                                            {obj.name}
                                        </option>
                                    )
                            )}
                        </select>
                        <select
                            value={connectionProtocol}
                            onChange={(e) =>
                                setConenctionProtocol(e.target.value)
                            }
                        >
                            <option value={DeviceConnection.TCP}>
                                {DeviceConnection.TCP}
                            </option>
                            <option value={DeviceConnection.UDP}>
                                {DeviceConnection.UDP}
                            </option>
                        </select>
                        <select
                            value={preset}
                            onChange={(e) => setPreset(e.target.value)}
                        >
                            <option disabled={true} value="-1">
                                Выберите пресет параметров (Danfoss)
                            </option>
                            <option value="231">231/331</option>
                            <option value="361">361</option>
                            <option value="368">368</option>
                        </select>
                        <AppInput
                            value={sysCount}
                            onChange={(e) =>
                                setSysCount(Number(e.target.value))
                            }
                            label="Количество систем"
                            type="number"
                        />
                        <AppInput
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="IP адрес"
                        />
                        <AppInput
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            placeholder="Порт"
                        />
                        <AppInput
                            value={slave}
                            onChange={(e) => setSlave(e.target.value)}
                            placeholder="Slave адрес"
                        />
                        <button onClick={() => accept()}>Добавить</button>
                        <button onClick={() => onClose && onClose()}>
                            Отмена
                        </button>
                    </div>
                </VFlexBox>
            </Modal>
        );
    }
);
