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

export interface ParametersResponse {
    id:number;
    enabled:boolean;
    name:string;
    tag:string;
}

interface GetPeriodAnswer{
    [k:number]:PeriodRead[]

}

interface PeriodRead {
    id:number;
    start_day:number;
    end_day:number;
    archive_type:number;
}

interface PeriodWrite extends PeriodRead {
    device_id:number;
    system_sub_id:number;
}

export interface ColontitulResponse extends ParametersResponse {
    value:string;
}

export interface ReportFiles {
    id:number;
    system_id:number;
    start_date:string;
    end_date:string;
    autocreated:boolean
    filepath:string;
    verbose_filename:string;
}


const heatSubcatQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({

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
        }),
        getArchivesFiles: build.query<ReportFiles[],number>({
            query: (id) => {
                return {
                    url:`heat_reports/files/${id}`,
                };
            },
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({ id }) => ({ type: "HeatReportFiles", id } as const)),
                        { type: "HeatReportFiles", id: "LIST" },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: "HeatReportFiles", id: "LIST" }],
        }),
        getUpCols: build.query<ColontitulResponse[],number>({
            query: (id) => {
                return {
                    url:`heat_reports/info/${id}/upcols`,
                };
            },
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({ id }) => ({ type: "Upcols", id } as const)),
                        { type: "Upcols", id: "LIST" },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: "Upcols", id: "LIST" }],
        }),
        getDownCols: build.query<ColontitulResponse[],number>({
            query: (id) => {
                return {
                    url:`heat_reports/info/${id}/downcols`,
                };
            },
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({ id }) => ({ type: "Downcols", id } as const)),
                        { type: "Downcols", id: "LIST" },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: "Downcols", id: "LIST" }],
        }),
        getParameters: build.query<ColontitulResponse[],number>({
            query: (id) => {
                return {
                    url:`heat_reports/info/${id}/parameters`,
                };
            },
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({ id }) => ({ type: "ReportParameters", id } as const)),
                        { type: "ReportParameters", id: "LIST" },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: "ReportParameters", id: "LIST" }],
        }),
        getPeriods: build.query<GetPeriodAnswer,number>({
            query: (id) => {
                return {
                    url:`heat_reports/periods/${id}`,
                };
            },
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        { type: "HeatPeriods", id: "LIST" },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: "HeatPeriods", id: "LIST" }],
        }),
        editUpCol:build.mutation<ColontitulResponse, Partial<ColontitulResponse> & Pick<ColontitulResponse, "id">>({
            query:({id,...patch})=>({
                url: `heat_reports/edit/${id}/upcol`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Upcols", id }],
        }),
        createUpCol:build.mutation<ColontitulResponse, Partial<ColontitulResponse> & Omit<ColontitulResponse,"tag">>({
            query:({id,...patch})=>({
                url: `heat_reports/create/${id}/upcol`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Upcols", id:"LIST" }],
        }),
        createPeriods:build.mutation<PeriodRead, Partial<PeriodWrite> & Omit<PeriodWrite,"id">>({
            query:({...patch})=>({
                url: "heat_reports/periods/create",
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "HeatPeriods", id:"LIST" }],
        }),
        editDownCol:build.mutation<ColontitulResponse, Partial<ColontitulResponse> & Pick<ColontitulResponse, "id">>({
            query:({id,...patch})=>({
                url: `heat_reports/edit/${id}/downcol`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Downcols", id }],
        }),
        editParameterCol:build.mutation<ParametersResponse, Partial<ParametersResponse> & Pick<ParametersResponse, "id">>({
            query:({id,...patch})=>({
                url: `heat_reports/edit/${id}/parameter`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "ReportParameters", id }],
        }),
        editParameterBySchema:build.mutation<void, Partial<ParametersResponse> & Pick<ParametersResponse, "id">>({
            query:({id})=>({
                url: `heat_reports/edit/${id}/parameters_by_schema`,
                method: "POST",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "ReportParameters", id:"LIST" }],
        }),
        editColsByDate:build.mutation<void, Partial<ParametersResponse> & Pick<ParametersResponse, "id">>({
            query:({id})=>({
                url: `heat_reports/edit/${id}/cols_update`,
                method: "POST",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Downcols", id:"LIST" },{ type: "Upcols", id:"LIST" }],
        }),
        deleteReportFile:build.mutation<void, Partial<ReportFiles> & Pick<ReportFiles, "id">>({
            query:({id})=>({
                url: `heat_reports/file/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "HeatReportFiles", id:"LIST" }],

        })
    }),
    overrideExisting: false,
});

export const getConfigParams = heatSubcatQuery.useGetSystemConfigParamsQuery;
export const getArchives = heatSubcatQuery.useGetArchivesStatQuery;
export const getUpCols = heatSubcatQuery.useGetUpColsQuery;
export const getDownCols = heatSubcatQuery.useGetDownColsQuery;
export const getParameters = heatSubcatQuery.useGetParametersQuery;
export const editUpCol = heatSubcatQuery.useEditUpColMutation;
export const editDownCol = heatSubcatQuery.useEditDownColMutation;
export const editParameter = heatSubcatQuery.useEditParameterColMutation;
export const createUpCol = heatSubcatQuery.useCreateUpColMutation;
export const editParamToSchema = heatSubcatQuery.useEditParameterBySchemaMutation;
export const editColsToData = heatSubcatQuery.useEditColsByDateMutation;

export const getPeriods = heatSubcatQuery.useGetPeriodsQuery;
export const createPeriod = heatSubcatQuery.useCreatePeriodsMutation;

export const getFiles = heatSubcatQuery.useGetArchivesFilesQuery;
export const deleteFile = heatSubcatQuery.useDeleteReportFileMutation;