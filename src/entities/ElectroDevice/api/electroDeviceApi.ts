import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
import { GetDeviceQuery } from "../model/types/electroDevice";

const electroDevicesQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getElectroDeviceData: build.query<GetDeviceQuery,string>({
            query: (id) => {
                return {
                    url:"electro_top_level_device/"+id,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const getElectroDeviceData = electroDevicesQuery.useGetElectroDeviceDataQuery;