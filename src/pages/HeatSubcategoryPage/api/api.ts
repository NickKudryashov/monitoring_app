import { HeatDevice } from "entities/Heatcounters";
import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";


export interface ConfigurationParameterAnswer {
    name:string;
    gnum:number;
    min:number;
    max:number;
}
export interface ArchivesInfo{
    start_date:string;
    end_date:string;
    count:string;
    schema:string;
    formula:string;
    name:string;
}

export type ArchivesRecord = Record<number,SystemArchivesInfo>
export interface SystemArchivesInfo {
    hour:ArchivesInfo;
    day:ArchivesInfo;
    month:ArchivesInfo;
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
        getSystemConfigParams: build.query<ConfigurationParameterAnswer[],string>({
            query: (id) => {
                return {
                    url:"heat_parameters_config/"+id,
                };
            },
        }),
        getArchivesStat: build.query<ArchivesRecord,string>({
            query: (id) => {
                return {
                    url:`heat_reports/info/${id}`,
                };
            },
        })
    }),
    overrideExisting: false,
});

export const getHeatDevs = heatSubcatQuery.useGetHeatSubcatQuery;
export const getConfigParams = heatSubcatQuery.useGetSystemConfigParamsQuery;
export const getArchives = heatSubcatQuery.useGetArchivesStatQuery;