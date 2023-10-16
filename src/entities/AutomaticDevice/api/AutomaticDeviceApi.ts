import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
import { AutomaticDeviceData } from "../model/types/AutomaticDeviceTypes";

const automaticDeviceQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAutomaticDeviceData: build.query<AutomaticDeviceData,string>({
            query: (id) => {
                return {
                    url:"automatic_device/"+id,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const getAutomaticDevice = automaticDeviceQuery.useGetAutomaticDeviceDataQuery;