import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { buildSelector } from "shared/store";

export const [useGetChartDatasets,getDatasets] = buildSelector((state:StateSchema)=>state.chart.datasets || []);