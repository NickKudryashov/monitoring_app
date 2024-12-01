import { HeatDevice, HeatParameters } from "../types/type";
import { rtkApi } from "@/shared/api/rtkApi";
// rename_heat_system/<int:system_id>
const heatDeviceQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getHeatDevice: build.query<HeatDevice,number>({
            query: (id) => {
                return {
                    url:`device/${id}`,
                };
            },
            providesTags: (result) =>
            // is result available?
                result
                    ? // successful query
                    [
                        { type: "HeatDevice", id: result.id},
                        { type: "HeatDevice", id: "LIST" },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: "HeatDevice", id: "LIST" }],
        }),
        editHeatParameterName:build.mutation<HeatParameters, Partial<HeatParameters> & Pick<HeatParameters, "id">>({
            query:({id,...patch})=>({
                url: `heat_parameter/${id}`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id,device }) => [{ type: "HeatDevice", device }],
        }),
        editHeatSystemName:build.mutation<void, {system_id:number,name:string}>({
            query:({name,system_id})=>({
                url: `rename_heat_system/${system_id}`,
                method: "POST",
                body: {name},
            }),
            invalidatesTags: (result, error, {}) => [{ type: "HeatDevice", id:'LIST' }],
        })
    }),
    overrideExisting: false,
});

export const getHeatDeviceData = heatDeviceQuery.useGetHeatDeviceQuery;
export const editHeatParameterName = heatDeviceQuery.useEditHeatParameterNameMutation;
export const editHeatSystemName = heatDeviceQuery.useEditHeatSystemNameMutation;