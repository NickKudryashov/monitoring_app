import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
import { PumpDetailInfo, PumpDeviceData } from "../model/types/pumpDevice";

const pumpDeviceQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPumpData: build.query<PumpDeviceData,string>({
            query: (id) => {
                return {
                    url:"pump/"+id,
                };
            },
        }),
        getPumpDataDetail: build.query<PumpDetailInfo,string>({
            query: (id) => {
                return {
                    url:"pump/detail/"+id,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const getPumpData = pumpDeviceQuery.useGetPumpDataQuery;
export const getPumpDataDetail = pumpDeviceQuery.useGetPumpDataDetailQuery;