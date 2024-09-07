import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { buildSelector } from "shared/store";

export const [useGetSelectedSubcategory,getSelectedSubcategory] = buildSelector((state:StateSchema)=>state.objSubCat.selectedSubcategory);