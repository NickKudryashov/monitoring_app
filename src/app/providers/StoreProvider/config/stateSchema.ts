import { ArchiveEventsSliceSchema } from "entities/ArchiveEvent";
import { ChartStateSchema } from "entities/Chart";
import { ObjectSubCategorySchema } from "entities/ObjectSubCategory";
import { objectState } from "entities/Objects";
import { TelegramChatSchema } from "entities/TelegramChat";
import { UserState } from "entities/user";
import { SubcatCardsSchema } from "features/ObjectCategoryCardView";
import { PumpPageStateSchema } from "pages/PumpSubcategoryPage";
import { rtkApi } from "shared/api/rtkApi";
import { ChartBuilderStateSchema } from "widgets/ChartBuilder";
import { NavbarStateSchema } from "widgets/Navbar";
import { SubcategoryTabStateSchema } from "widgets/SubcategoryTabs";

export interface StateSchema {
    [rtkApi.reducerPath]:ReturnType<typeof rtkApi.reducer>;
    user:UserState;
    objects:objectState;
    chats:TelegramChatSchema;
    objSubCat:ObjectSubCategorySchema;
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