import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getAllObjects = (state:StateSchema)=>state.objects.objects;
export const getSelectedUserObject = (state:StateSchema)=>state.objects.selectedObject;