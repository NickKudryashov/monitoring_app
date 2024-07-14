import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getSelectedParameters = (state:StateSchema)=>state.chartBuilder.selectedParameters;
export const getReportData = (state:StateSchema)=>state.chartBuilder.reportData;