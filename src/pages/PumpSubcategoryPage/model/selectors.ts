import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";

export const getPumpPageParameterGroup = (state:StateSchema)=>state.pumpPage.selectedParameterSubGroup;