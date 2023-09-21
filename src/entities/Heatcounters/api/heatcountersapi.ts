import { url } from "inspector";
import { HeatDevice } from "../types/type";
import { rtkApi } from "shared/api/rtkApi";

const heatDeviceQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getHeatDevice: build.query<HeatDevice,string>({
            query: (id) => {
                return {
                    url:"device/"+id,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const getHeatDeviceData = heatDeviceQuery.useGetHeatDeviceQuery;