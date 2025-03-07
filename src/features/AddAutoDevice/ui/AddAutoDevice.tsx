import classNames from "@/shared/lib/classNames/classNames";
import { memo, useEffect, useState } from "react";
import cls from "./AddAutoDevice.module.scss";
import type { PropsWithChildren } from "react";
import $api from "@/shared/api";
import { AppInput } from "@/shared/ui/AppInput/AppInput";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import { getObjectSubcategoryData } from "@/entities/ObjectSubCategory";
import { getAutomaticDeviceTypes } from "@/entities/AutomaticDevice";
import { getAllObjects } from "@/entities/Objects";
import { Button, Flex, Form, Input, Modal, Result, Select, Tooltip, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import {
    ClearOutlined,
    CloseCircleOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import useModal from "antd/es/modal/useModal";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
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
        const [form] = Form.useForm();
        const [devType, setDevType] = useState<string>("-1");
        const [sysCount, setSysCount] = useState<number>(1);
        const { data: objects, isLoading: isObjectsLoading } = getAllObjects(
            {},
        );
        const [addAutoModal, setAutoModal] = useState(false);

        const [selectedSubcat, setSelectedSubcat] = useState("-1");
        const [dnum, setDnum] = useState("");
        const [name, setName] = useState("");
        const [selectedObj, setSelectedObj] = useState("-1");
        const obj = Form.useWatch("object", form);
        const conType = Form.useWatch("connection_type", form);
        const { data, isLoading, refetch } = getObjectSubcategoryData({
            id: Number(obj),
        });
        const { data: devTypes, isLoading: isDevTypesLoading } =
            getAutomaticDeviceTypes();
        const [connectionProtocol, setConenctionProtocol] = useState(
            DeviceConnection.TCP,
        );
        const [ip, setIp] = useState("");
        const [port, setPort] = useState("");
        const [slave, setSlave] = useState("");
        const [preset, setPreset] = useState("231");
        const dispatch = useAppDispatch();
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
            <VFlexBox>
            <HFlexBox
                onClick={() => setAutoModal(true)}
                className={cls.feature}
                align={"center"}
                alignItems="center"
                height={"100%%"}
                width={"100%%"}
            >
                <p>Добавить автоматику</p>
            </HFlexBox>
            <Modal
                open={addAutoModal}
                closeIcon={null}
                okButtonProps={undefined}
                onCancel={()=>setAutoModal(false)}
                onOk={()=>setAutoModal(false)}
                footer={[]}
                okText={'Создать'}
                destroyOnClose
                cancelText={'Отмена'}
                className={classNames(cls.AddAutoDevice, {}, [className])}
            >
                <Flex vertical>
                    <Form
                        style={{ userSelect: "none" }}
                        form={form}
                        onFinish={() => alert("asdas")}
                        onError={() => alert("eror")}
                        labelCol={{ span: 10 }}
                        labelAlign="left"
                        wrapperCol={{ span: 14 }}
                    >
                        <Form.Item required label="Имя прибора" name={"device_name"}>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item required label="Номер прибора" name="device_num">
                            <Input
                                value={dnum}
                                onChange={(e) => setDnum(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item required label="Тип прибора" name="device_type">
                            <Select
                                options={devTypes?.map((el) => ({
                                    label: el.verbose,
                                    value: el.devtype,
                                }))}
                                loading={isDevTypesLoading}
                            />
                        </Form.Item>
                        <Form.Item required label="Выбор объекта" name="object">
                            <Select
                                options={objects?.map((el) => ({
                                    label: el.name,
                                    value: el.id,
                                }))}
                                loading={isObjectsLoading}
                            />
                        </Form.Item>
                        <Form.Item required label="Выбор системы" name="subcat">
                            <Tooltip title={!obj ? "Выберите объект для выбора системы" : null}>
                            <Select
                                disabled={!obj}
                                options={data?.data?.map((el) => ({
                                    label: el.name,
                                    value: el.id,
                                }))}
                                loading={isLoading}
                            />
                            </Tooltip>
                        </Form.Item>
                        <Form.Item required
                            label="Тип соединения"
                            name="connection_type"
                        >
                            <Select
                                options={[
                                    {
                                        label: DeviceConnection.TCP,
                                        value: DeviceConnection.TCP,
                                    },
                                    {
                                        label: DeviceConnection.UDP,
                                        value: DeviceConnection.UDP,
                                    },
                                    {
                                        label: 'GSM',
                                        value: 'gsm',
                                    },
                                ]}
                            />
                        </Form.Item>

                        {conType!=='gsm' && 
                        <>
                        <Form.Item 
                            label={"IP"}
                            required
                        >
                            <Input placeholder="IP" />
                        </Form.Item>
                        <Form.Item
                            label={"Порт"}
                            required
                        >
                            <Input
                                placeholder="Порт"
                               
                            />
                        </Form.Item>
                        </>}
                        {conType==='gsm' && 
                        <>
                        <Form.Item
                        shouldUpdate
                        name='phnum'
                        required
                            label={"Номер телефона"}
                            rules={[{required:conType==='gsm',message:'Обязательное поле'}]}

                        >
                            <Input />
                        </Form.Item>
                        </>}
                        {/* <Form.Item label={"IP адрес"} name={"ip"}>
                            <Input />
                        </Form.Item>
                        <Form.Item label={"Порт"} name="port">
                            <Input
                                value={port}
                                onChange={(e) => setPort(e.target.value)}
                                placeholder="Порт"
                            />
                        </Form.Item> */}
                        <Form.Item
                            label="Выбор шаблона прибора"
                            name="template"
                            required
                        >
                            <Select
                                options={[
                                    { label: "231", value: "231" },
                                    { label: "361", value: "361" },
                                    { label: "368", value: "368" },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item label="Slave адрес" name="slave"
                            >
                            <Input
                                allowClear={true}
                                value={slave}
                                onChange={(e) => setSlave(e.target.value)}
                                placeholder="Slave адрес"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Flex gap='small'>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Добавить
                                </Button>
                                <Button
                                onClick={()=>setAutoModal(false)}
                            >
                                Отмена
                                </Button>
                                </Flex>
                        </Form.Item>
                    </Form>
                </Flex>
            </Modal>
            </VFlexBox>
        );
    },
);

AddAutoDevice.displayName = "addAutoDevice";
