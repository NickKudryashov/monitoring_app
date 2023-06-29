import { categoryState } from "entities/Category";
import { ElectroDeviceSchema } from "entities/ElectroDevice";
import { ElectroNodesSchema } from "entities/ElectroNodes";
import { HeatDeviceSchema } from "entities/Heatcounters";
import { HeatNodeResponse } from "entities/HeatNodes";
import { heatNodeState } from "entities/HeatNodes/reducers/reducers";
import { objectState } from "entities/Objects";
import { UserState } from "entities/user";
import { HeatArchivesSchema } from "features/HeatArchives";
import { DeviceListState } from "widgets/DeviceList";

export interface StateSchema {
    category:categoryState;
    heatDevices:HeatDeviceSchema;
    heatNodes:heatNodeState;
    user:UserState;
    objects:objectState;
    deviceList:DeviceListState;
    electroNodes:ElectroNodesSchema;
    electroDevices:ElectroDeviceSchema;
    archives:HeatArchivesSchema;
}

export interface ThunkConfig<T> {
    rejectValue:T;
    state:StateSchema
}
//     deviceListReducer,