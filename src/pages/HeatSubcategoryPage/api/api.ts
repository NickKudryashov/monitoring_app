import { HeatDevice } from "entities/Heatcounters";
import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";

interface GeneralAnswer {
    subcat_name:string;
    user_object_name:string;
    adress:string;
}

interface ConfigurationParameterAnswer {
    name:string;
    gnum:number;
    min:number;
    max:number;
}


const heatSubcatQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getHeatSubcat: build.query<number[],string>({
            query: (id) => {
                return {
                    url:"subcategory/"+id+"/heat",
                };
            },
        }),
        getSubcatGeneral: build.query<GeneralAnswer,string>({
            query: (id) => {
                return {
                    url:"subcat_general/"+id,
                };
            },
        }),
        getSystemConfigParams: build.query<ConfigurationParameterAnswer[],string>({
            query: (id) => {
                return {
                    url:"heat_parameters_config/"+id,
                };
            },
        })
    }),
    overrideExisting: false,
});

export const getHeatDevs = heatSubcatQuery.useGetHeatSubcatQuery;
export const getGeneralInfo = heatSubcatQuery.useGetSubcatGeneralQuery;
export const getConfigParams = heatSubcatQuery.useGetSystemConfigParamsQuery;