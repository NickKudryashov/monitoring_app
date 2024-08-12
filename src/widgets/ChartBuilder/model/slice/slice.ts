import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartBuilderStateSchema, ChartFragmentDeleteProps, ChartFragmentProps, DeleteParameterArgs, SubtabContent, UserObjectFragment } from "../types/type";

const initialState:ChartBuilderStateSchema = {
    selectedParameters:{auto_node:[],heat_energy_node:[],pump_station_node:[],electro_energy_node:[]},
    reportData:{}
};

export const chartBuilderSlice = createSlice({
    name:"chartBuilder",
    initialState,
    reducers:{
        cleanup(state) {
            state.reportData={};
            state.selectedParameters = initialState.selectedParameters;
        },
        addHeatParameter(state,action:PayloadAction<SubtabContent>) {
            if (
                state.selectedParameters.heat_energy_node.filter(
                    (el) => el.id === action.payload.id && el.name === action.payload.name
                ).length > 0
            ) {
                return;
            }
            state.selectedParameters.heat_energy_node = [...state.selectedParameters.heat_energy_node,action.payload];
        },
        addAutoParameter(state,action:PayloadAction<SubtabContent>) {
            if (
                state.selectedParameters.auto_node.filter(
                    (el) => el.id === action.payload.id && el.name === action.payload.name
                ).length > 0
            ) {
                return;
            }
            state.selectedParameters.auto_node = [...state.selectedParameters.auto_node,action.payload];
        },
        addPumpParameter(state,action:PayloadAction<SubtabContent>) {
            if (
                state.selectedParameters.pump_station_node.filter(
                    (el) => el.id === action.payload.id && el.name === action.payload.name
                ).length > 0
            ) {
                return;
            }
            state.selectedParameters.pump_station_node = [...state.selectedParameters.pump_station_node,action.payload];
        },
        removeParameter(state,action:PayloadAction<DeleteParameterArgs>){
            if (state.selectedParameters && state.selectedParameters[action.payload.subtype] ) {
                const subtype = action.payload.subtype;
                state.selectedParameters[action.payload.subtype] = state.selectedParameters[action.payload.subtype]?.filter((el)=>!(el.id === action.payload.content.id && el.name === action.payload.content.name)) || [];
            }
        },
        addChartData(state,action:PayloadAction<ChartFragmentProps>){
            const {system,userObjectData} = action.payload;
            if (!state.reportData[userObjectData.id]) {
                state.reportData[userObjectData.id]= {userObjectData:userObjectData,systems:{}};
            }
            console.log(`Список систем: ${Object.keys(state.reportData[userObjectData.id].systems)} а добавляли ${system.systemInfo.id}`);
            if (state?.reportData[userObjectData.id]?.systems[system.systemInfo.id]===undefined) {
                state.reportData[userObjectData.id].systems[system.systemInfo.id] = {systemInfo:system.systemInfo,parameters:{}};
            }
            console.log(`Список систем: ${Object.keys(state.reportData[userObjectData.id]?.systems)} после добавления`);
            state.reportData[userObjectData.id].systems[system.systemInfo.id].parameters[system.parameter.id] = {...system.parameter};
        },
        removeChartData(state,action:PayloadAction<ChartFragmentDeleteProps>){
            const {id,subcat_id,user_object_id} = action.payload;
            if (state.reportData[user_object_id].systems[subcat_id].parameters[id]) {
                delete state.reportData[user_object_id].systems[subcat_id].parameters[id];
            }
            if (Object.keys(state.reportData[user_object_id].systems[subcat_id].parameters).length===0) {
                delete state.reportData[user_object_id].systems[subcat_id];
            }
            if (Object.keys(state.reportData[user_object_id].systems).length===0) {
                delete state.reportData[user_object_id];
            }
        }
    },
});


export const {reducer:chartBuilderReducer } = chartBuilderSlice;
export const {actions:chartBuilderActions } = chartBuilderSlice;