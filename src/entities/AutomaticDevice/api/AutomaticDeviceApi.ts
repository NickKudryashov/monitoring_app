import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
import { AutomaticDeviceData, ParameterGroup } from "../model/types/AutomaticDeviceTypes";

interface TypeResponseFragment {
    devtype:string;
    verbose:string;
}


const automaticDeviceQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAutomaticDeviceData: build.query<AutomaticDeviceData,number>({
            query: (id) => {
                return {
                    url:`automatic_device/${id}`,
                };
            },
            transformResponse(response:AutomaticDeviceData,meta,arg) {
                const resultParamGroup:Record<number,ParameterGroup[]> = {};
                const systemParamGroup:Record<number,ParameterGroup[]> = {};
                response.parameters.forEach((group)=>{
                    const systemIndex = group.index===0 ? 2 : group.index;
                    if (!resultParamGroup[systemIndex]) {
                        resultParamGroup[systemIndex] = [group,];
                    }
                    else {
                        resultParamGroup[systemIndex] = [...resultParamGroup[systemIndex],group];
                    }
                });
                response.system_params.forEach((group)=>{
                    if (!systemParamGroup[group.index]) {
                        systemParamGroup[group.index] = [group,];
                    }
                    else {
                        systemParamGroup[group.index] = [...systemParamGroup[group.index],group];
                    }
                });
                return {...response,resultParamGroup,systemParamGroup};
            },
        }),
        getAvailableAutoDevTypes:build.query<TypeResponseFragment[],void>({
            query: () => {
                return {
                    url:"automatic_device/types",
                };
            },
            transformResponse(resp:Record<string,string>, meta, arg) {
                const result:TypeResponseFragment[] = Object.keys(resp).map((el)=>({devtype:el,verbose:resp[el]}));
                return result;
            },
        })
    }),
    overrideExisting: false,
});

export const getAutomaticDevice = automaticDeviceQuery.useGetAutomaticDeviceDataQuery;
export const getAutomaticDeviceTypes = automaticDeviceQuery.useGetAvailableAutoDevTypesQuery;