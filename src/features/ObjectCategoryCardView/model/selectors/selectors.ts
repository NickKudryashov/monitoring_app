import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";

export const getSelectedSystemCard  = (state:StateSchema)=>state.subcatCards.selectedItem;