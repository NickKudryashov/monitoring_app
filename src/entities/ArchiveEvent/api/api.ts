import { url } from "inspector";
import { ArchiveEvent } from "../types/type";
import { rtkApi } from "@/shared/api/rtkApi";

const heatArchiveEventsQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArchivesEvents:build.query<ArchiveEvent[],number>({
            query: (offset) =>{
                return {
                    url:`archives_events/${offset}`,
                };
            }
        }),
    }),
    overrideExisting: false,
});

export const getArchivesEvents = heatArchiveEventsQuery.useGetArchivesEventsQuery;