import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getAllObjects = (state:StateSchema)=>state.objects;
export const getSelectedUserObject = (state:StateSchema)=>state.objects.selectedObject;