import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
import { ElectroCounter, GetDeviceQuery } from "../model/types/electroDevice";

const electroDevicesQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getElectroDeviceData: build.query<GetDeviceQuery,string>({
            query: (id) => {
                return {
                    url:"electro_top_level_device/"+id,
                };
            },
        }),
        getElectroCountersByCan: build.query<ElectroCounter[],{id:string,counterInterface:string}>({
            query: ({id,counterInterface}) => {
                return {
                    url:`electro_top_level_device/${id}/${counterInterface}`,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const getElectroDeviceData = electroDevicesQuery.useGetElectroDeviceDataQuery;
export const getElectroDeviceCountersByCan = electroDevicesQuery.useGetElectroCountersByCanQuery;