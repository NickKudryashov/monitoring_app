import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getTab = (state:StateSchema)=>state.tabs.currentTab;
export const getSubTab = (state:StateSchema)=>state.tabs.currentSubTab;
export const getTabContentLength = (state:StateSchema)=>state.tabs.tabContentLength;