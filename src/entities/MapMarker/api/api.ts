import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
import { MapMarkerData } from "../types/types";

const mapMarkerQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getMarkers: build.query<MapMarkerData[],void>({
            query: () => {
                return {
                    url:"map/markers",
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const getMapMarkers = mapMarkerQuery.useGetMarkersQuery;