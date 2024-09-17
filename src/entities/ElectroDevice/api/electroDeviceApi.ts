import { url } from "inspector";
import { rtkApi } from "@/shared/api/rtkApi";
import { ElectroCounter, GetDeviceQuery } from "../model/types/electroDevice";

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
        })
    }),
    overrideExisting: false,
});

export const getElectroDeviceData = electroDevicesQuery.useGetElectroDeviceDataQuery;
export const getElectroDeviceCountersByCan = electroDevicesQuery.useGetElectroCountersByCanQuery;
export const renameElectroCounter = electroDevicesQuery.useEditElectrocounterNameMutation;