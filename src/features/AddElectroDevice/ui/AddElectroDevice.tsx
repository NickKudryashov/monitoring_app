import classNames from "@/shared/lib/classNames/classNames";
import { memo, useCallback, useState } from "react";
import cls from "./AddElectroDevice.module.scss";

import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { Modal } from "@/shared/ui/Modal/Modal";
import $api from "@/shared/api";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { getObjectSubcategoryData } from "@/entities/ObjectSubCategory";
import { getAllObjects } from "@/entities/Objects";

interface AddElectroDeviceProps {
    className?: string;
    isOpen?: boolean;
    lazy?: boolean;
    onClose?: () => void;
}
const UM_31_TYPE = "um_31";
const UM_31_VERBOSE = "УМ-31 GPRS";
const UM_31_RTU_TYPE = "um_31_rtu";
const UM_31_RTU_VERBOSE = "УМ-31 RTU";
const DeviceConnection = {
    TCP: "TCP",
    UDP: "UDP",
};
export const AddElectroDeviceContent = memo(
    (props: PropsWithChildren<AddElectroDeviceProps>) => {
        const { className = "", isOpen, onClose, lazy } = props;
        const { data: objects } = getAllObjects({});
        const [selectedObj, setSelectedObj] = useState(
            String(objects ? objects[0]?.id : ""),
        );
        const { data, isLoading, refetch } = getObjectSubcategoryData({
            id: Number(selectedObj),
        });
        const [selectedSubcat, setSelectedSubcat] = useState("-1");
        const [connectionProtocol, setConenctionProtocol] = useState(
            DeviceConnection.TCP,
        );
        const [name, setName] = useState("");
        const [dnum, setDnum] = useState("");
        const [ip, setIp] = useState("");
        const [port, setPort] = useState("");
        const [password, setPassword] = useState("");
        const dispatch = useAppDispatch();
        const [devType, setDevType] = useState(UM_31_TYPE);
        const accept = async () => {
            const requestData = {
                user_object: Number(selectedObj),
                name,
                device_type: devType,
                device_type_verbose_name: UM_31_VERBOSE,
                device_num: dnum,
                subcategory: Number(selectedSubcat),
                connection_info: {
                    ip: ip,
                    port,
                    connection_type: connectionProtocol,
                },
                password,
            };
            const response = await $api.post("electro_top_level_device/add", {
                ...requestData,
            });
            if (onClose) {
                onClose();
            }
        };
        const closeHandler = useCallback(() => {
            if (onClose) {
                onClose();
            }
        }, []);
        return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                className={classNames(cls.AddElectroDevice, {}, [className])}
            >
                <VFlexBox>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Название прибора"
                    />
                    <input
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
                        <option key={UM_31_TYPE} value={UM_31_TYPE}>
                            {UM_31_VERBOSE}
                        </option>
                        <option key={UM_31_RTU_TYPE} value={UM_31_RTU_TYPE}>
                            {UM_31_RTU_VERBOSE}
                        </option>
                    </select>
                    <select
                        value={selectedObj}
                        onChange={(e) => setSelectedObj(e.target.value)}
                    >
                        <option disabled={true} value="-1">
                            Выберите объект
                        </option>
                        {objects?.map((obj) => (
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
                                ),
                        )}
                    </select>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль прибора"
                    />
                    <select
                        value={connectionProtocol}
                        onChange={(e) => setConenctionProtocol(e.target.value)}
                    >
                        <option value={DeviceConnection.TCP}>
                            {DeviceConnection.TCP}
                        </option>
                        <option value={DeviceConnection.UDP}>
                            {DeviceConnection.UDP}
                        </option>
                    </select>
                    <input
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        placeholder="IP адрес"
                    />
                    <input
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                        placeholder="Порт"
                    />
                    <button onClick={() => accept()}>Добавить</button>
                    <button onClick={closeHandler}>Отмена</button>
                </VFlexBox>
            </Modal>
        );
    },
);

export const AddElectroDevice = memo(
    (props: PropsWithChildren<AddElectroDeviceProps>) => {
        const { lazy, isOpen } = props;
        if (lazy && !isOpen) {
            return null;
        } else {
            return <AddElectroDeviceContent {...props} />;
        }
    },
);

AddElectroDeviceContent.displayName = "AddElectroContent";
AddElectroDevice.displayName = "AddElectroDevice";
