import { HeatDevice } from "entities/Heatcounters";
import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";


const automaticDeviceQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAutoSubcat: build.query<number[],string>({
            query: (id) => {
                return {
                    url:"subcategory/"+id+"/auto",
                };
            },
        }),
    }),
    overrideExisting: false,
});


export const getAutomaticDevId = automaticDeviceQuery.useGetAutoSubcatQuery;