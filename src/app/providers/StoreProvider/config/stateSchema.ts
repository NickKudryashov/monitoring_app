import { categoryState } from "entities/Category";
import { ElectroDeviceSchema } from "entities/ElectroDevice";
import { HeatDeviceSchema } from "entities/Heatcounters";
import { ObjectSubCategorySchema } from "entities/ObjectSubCategory";
import { objectState } from "entities/Objects";
import { PumpDeviceSchema } from "entities/PumpDevice";
import { TelegramChatSchema } from "entities/TelegramChat";
import { UserState } from "entities/user";
import { HeatArchivesSchema } from "features/HeatArchives";
import { SubCategoryPageSchema } from "pages/SubcartegoryPage";
import { DeviceListState } from "widgets/DeviceList";

export interface StateSchema {
    category:categoryState;
    heatDevices:HeatDeviceSchema;
    user:UserState;
    objects:objectState;
    deviceList:DeviceListState;
    electroDevices:ElectroDeviceSchema;
    archives:HeatArchivesSchema;
    pumpDevices:PumpDeviceSchema;
    chats:TelegramChatSchema;
    objSubCat:ObjectSubCategorySchema;
    subCatPage:SubCategoryPageSchema;
}

export interface ThunkConfig<T> {
    rejectValue:T;
    state:StateSchema
}
//     deviceListReducer,