import { categoryState } from "entities/Category";
import { HeatDeviceSchema } from "entities/Heatcounters";
import { HeatNodeResponse } from "entities/HeatNodes";
import { heatNodeState } from "entities/HeatNodes/reducers/reducers";
import { objectState } from "entities/Objects";
import { UserState } from "entities/user";
import { DeviceListState } from "widgets/DeviceList";

export interface StateSchema {
    category:categoryState;
    heatDevices:HeatDeviceSchema;
    heatNodes:heatNodeState;
    user:UserState;
    objects:objectState;
    deviceList:DeviceListState;
}


//     deviceListReducer,