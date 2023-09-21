import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
import { PumpDeviceData } from "../model/types/pumpDevice";

const pumpDeviceQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPumpData: build.query<PumpDeviceData,string>({
            query: (id) => {
                return {
                    url:"pump/"+id,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const getPumpData = pumpDeviceQuery.useGetPumpDataQuery;