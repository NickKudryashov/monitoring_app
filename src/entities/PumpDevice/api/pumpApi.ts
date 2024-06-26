import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
import { PumpDetailInfo, PumpDeviceData, PumpParameter } from "../model/types/pumpDevice";

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
    }),
    overrideExisting: false,
});

export const getPumpData = pumpDeviceQuery.useGetPumpDataQuery;
export const getPumpDataDetail = pumpDeviceQuery.useGetPumpDataDetailQuery;