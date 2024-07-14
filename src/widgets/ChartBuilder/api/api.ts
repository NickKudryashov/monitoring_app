import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";



const chartBuilderQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getReportData:build.query<string[],void>({
            query: () =>{
                return {
                    url:"/chart_data",
                };
            }
        }),
    }),
    overrideExisting: false,
});

export const getArchivesEvents = chartBuilderQuery.useGetReportDataQuery;