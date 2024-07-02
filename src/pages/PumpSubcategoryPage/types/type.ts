import { PumpDetailInfoBySystem } from "entities/PumpDevice";

export interface PumpPageStateSchema {
    selectedParameterSubGroup?:keyof PumpDetailInfoBySystem;
}