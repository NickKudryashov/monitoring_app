import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getDatasets = (state:StateSchema)=>state.chart.datasets;