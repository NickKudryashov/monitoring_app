import { HeatDevice } from "entities/Heatcounters";
import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";


const electroSubcatQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getElectroSubcat: build.query<number[],string>({
            query: (id) => {
                return {
                    url:"subcategory/"+id+"/electro",
                };
            },
        }),
    }),
    overrideExisting: false,
});


export const getElectroDevId = electroSubcatQuery.useGetElectroSubcatQuery;