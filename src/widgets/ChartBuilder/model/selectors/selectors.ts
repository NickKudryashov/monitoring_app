import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getSelectedParameters = (state:StateSchema)=>state.chartBuilder.selectedParameters;
export const getReportData = (state:StateSchema)=>state.chartBuilder.reportData;
export const getHeatParameters = createSelector(getSelectedParameters,(params)=>{
    return params.heat_energy_node;
});
export const getAutoParameters = createSelector(getSelectedParameters,(params)=>{
    return params.auto_node;
});
export const getPumpParameters = createSelector(getSelectedParameters,(params)=>{
    return params.pump_station_node;
});