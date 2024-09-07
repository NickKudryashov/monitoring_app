import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { buildSelector } from "shared/store";

export const [useGetAllObjects,getAllObjects] = buildSelector((state:StateSchema)=>state.objects.objects);
export const [useGetSelectedUserObject,getSelectedUserObject] = buildSelector((state:StateSchema)=>state.objects.selectedObject);