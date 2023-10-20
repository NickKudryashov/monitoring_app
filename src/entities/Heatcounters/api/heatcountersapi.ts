import { url } from "inspector";
import { ArchiveEvent, HeatDevice } from "../types/type";
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
        getArchivesEvents:build.query<ArchiveEvent[],void>({
            query: () =>{
                return {
                    url:"archives_events",
                };
            }
        })
    }),
    overrideExisting: false,
});

export const getHeatDeviceData = heatDeviceQuery.useGetHeatDeviceQuery;
export const getArchivesEvents = heatDeviceQuery.useGetArchivesEventsQuery;