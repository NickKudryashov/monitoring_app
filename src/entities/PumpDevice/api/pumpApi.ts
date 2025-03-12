import { url } from "inspector";
import { rtkApi } from "@/shared/api/rtkApi";
import { PumpDetailInfo, PumpDeviceData, PumpParameter } from "../model/types/pumpDevice";
import { GSMConnection, InternetConnection } from "@/shared/types/connectionTypes";

const pumpDeviceQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPumpData: build.query<PumpDeviceData,number>({
            query: (id) => {
                return {
                    url:`pump/${id}`,
                };
            },
            transformResponse(response:PumpDeviceData) {
                const parameterByGroup:Record<string,PumpParameter[]> = {};
                response.parameters.forEach((el)=>{
                    if (!parameterByGroup[el.parameter_verbose_group]) {
                        parameterByGroup[el.parameter_verbose_group] = [el,];
                    }
                    else {
                        parameterByGroup[el.parameter_verbose_group] = [... parameterByGroup[el.parameter_verbose_group],el];
                    }
                });
                return {...response,parametersByGroup:parameterByGroup};
            }
        }),
        getPumpDataDetail: build.query<PumpDetailInfo,number>({
            query: (id) => {
                return {
                    url:`pump/detail/${id}`,
                };
            },
        }),
        editPumpConnectionInfo:build.mutation<void, (GSMConnection | InternetConnection) & {system_id:number}>({
                    query:({system_id,...body})=>({
                        url: `pump/connection/${system_id}`,
                        method: "POST",
                        body,
                    }),
                    invalidatesTags: (result, error, {}) => [{ type: "HeatDevice", id:'LIST' }],
                }),
                getPumpConnectionInfo: build.query<GSMConnection | InternetConnection,number>({
                    query: (id) => {
                        return {
                            url:`pump/connection/${id}`,
                        };
                    },
                }),
    }),
    overrideExisting: false,
});

export const getPumpData = pumpDeviceQuery.useGetPumpDataQuery;
export const getPumpDataDetail = pumpDeviceQuery.useGetPumpDataDetailQuery;
export const {useEditPumpConnectionInfoMutation,useGetPumpConnectionInfoQuery} = pumpDeviceQuery