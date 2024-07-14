import { ArchiveEventsSliceSchema } from "entities/ArchiveEvent";
import { categoryState } from "entities/Category";
import { ChartStateSchema } from "entities/Chart";
import { ElectroDeviceSchema } from "entities/ElectroDevice";
import { HeatDeviceSchema } from "entities/Heatcounters";
import { ObjectSubCategorySchema } from "entities/ObjectSubCategory";
import { objectState } from "entities/Objects";
import { PumpDeviceSchema } from "entities/PumpDevice";
import { TelegramChatSchema } from "entities/TelegramChat";
import { UserState } from "entities/user";
import { HeatArchivesSchema } from "features/HeatArchives";
import { SubcatCardsSchema } from "features/ObjectCategoryCardView";
import { PumpPageStateSchema } from "pages/PumpSubcategoryPage";
import { SubCategoryPageSchema } from "pages/SubcartegoryPage";
import { rtkApi } from "shared/api/rtkApi";
import { ChartBuilderStateSchema } from "widgets/ChartBuilder";
import { DeviceListState } from "widgets/DeviceList";
import { NavbarStateSchema } from "widgets/Navbar";
import { SubcategoryTabStateSchema } from "widgets/SubcategoryTabs";

export interface StateSchema {
    [rtkApi.reducerPath]:ReturnType<typeof rtkApi.reducer>;
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
    subcatCards:SubcatCardsSchema;
    archiveEvents:ArchiveEventsSliceSchema;
    navbar:NavbarStateSchema;
    tabs:SubcategoryTabStateSchema;
    pumpPage:PumpPageStateSchema;
    chart:ChartStateSchema;
    chartBuilder:ChartBuilderStateSchema;
}

export interface ThunkConfig<T> {
    rejectValue:T;
    state:StateSchema
}
//     deviceListReducer,