import { url } from "inspector";
import { rtkApi } from "@/shared/api/rtkApi";
import { ElectroCounter, GetDeviceQuery } from "../model/types/electroDevice";
import { GSMConnection, InternetConnection } from "@/shared/types/connectionTypes";

const electroDevicesQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getElectroDeviceData: build.query<GetDeviceQuery,number>({
            query: (id) => {
                return {
                    url:`electro_top_level_device/${id}`,
                };
            },
            transformResponse:(response:GetDeviceQuery)=>{
                return {...response,systemCount:response?.systemCount};
            }
        }),
        getElectroCountersByCan: build.query<ElectroCounter[],{id:string,counterInterface:string}>({
            query: ({id,counterInterface}) => {
                return {
                    url:`electro_top_level_device/${id}/${counterInterface}`,
                };
            },
        }),
        editElectrocounterName:build.mutation<ElectroCounter, Partial<ElectroCounter> & Pick<ElectroCounter, "id">>({
            query:({id,...patch})=>({
                url: `electrocounter/${id}`,
                method: "PUT",
                body: patch,
            }),
        }),
        editAutopollSettings:build.mutation<void,{id:number,autopoll_flag:boolean}>({
            query:({id,...patch})=>({
                url: `electro/${id}/edit`,
                method: "POST",
                body: patch,
            }),
        }),
        editElectroConnectionInfo:build.mutation<void, (GSMConnection | InternetConnection) & {system_id:number}>({
            query:({system_id,...body})=>({
                url: `electro/connection/${system_id}`,
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, {}) => [{ type: "HeatDevice", id:'LIST' }],
        }),
        getElectroConnectionInfo: build.query<GSMConnection | InternetConnection,number>({
            query: (id) => {
                return {
                    url:`electro/connection/${id}`,
                };
            },
        }),
    }),

    overrideExisting: false,
});

export const getElectroDeviceData = electroDevicesQuery.useGetElectroDeviceDataQuery;
export const getElectroDeviceCountersByCan = electroDevicesQuery.useGetElectroCountersByCanQuery;
export const renameElectroCounter = electroDevicesQuery.useEditElectrocounterNameMutation;
export const editAutopollSettings = electroDevicesQuery.useEditAutopollSettingsMutation;
export const {useEditElectroConnectionInfoMutation,useGetElectroConnectionInfoQuery} = electroDevicesQuery