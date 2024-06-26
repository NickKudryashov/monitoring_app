import { memo, useEffect, useRef, useState } from "react";
import cls from "./PumpDevice.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/hooks/hooks";
import {
    checkPollPumpDevice,
    fetchPumpDevice,
    pollPumpDevice,
} from "../model/services/fetchPumpDevice/fetchPumpDevice";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import $api from "shared/api";
import { pumpDeviceActions } from "../model/slice/pumpDevice";
import { createParameterGroups } from "../model/helpers/sortParametersByGroup";
import { Loader } from "shared/ui/Loader/Loader";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { useInfinityScroll } from "shared/hooks/useInfinityScroll";
import { PumpPollResponse } from "../model/types/pumpDevice";
import { Modal } from "shared/ui/Modal/Modal";
import { getPumpData } from "../api/pumpApi";

const GROUP_ORDER = [
    "general_group",
    "pump_1_group",
    "pump_2_group",
    "pump_3_group",
    "pump_4_group",
    "pump_5_group",
    "pump_6_group",
];
const GENERAL = "general_group";
const PUMP_1 = "pump_1_group";
const PUMP_2 = "pump_2_group";
const PUMP_3 = "pump_3_group";
const PUMP_4 = "pump_4_group";
const PUMP_5 = "pump_5_group";
const PUMP_6 = "pump_6_group";

const VERBOSE: Record<string, string> = {
    general_group: "Общие параметры",
    pump_1_group: "Параметры насоса №1",
    pump_2_group: "Параметры насоса №2",
    pump_3_group: "Параметры насоса №3",
    pump_4_group: "Параметры насоса №4",
    pump_5_group: "Параметры насоса №5",
    pump_6_group: "Параметры насоса №6",
};

const VIEW_1 = "system_general_error";
const VIEW_2 = "system_ready_auto_mode";
const VIEW_3 = "out_pressure";

interface ExpandedDict {
    [Key: string]: boolean;
}

export interface PumpDeviceProps {
    className?: string;
    id: number;
}

export const PumpDevice = memo((props: PumpDeviceProps) => {
    const { className, id } = props;

    return <div className={classNames(cls.pumpDevice, {}, [className])}></div>;
});
