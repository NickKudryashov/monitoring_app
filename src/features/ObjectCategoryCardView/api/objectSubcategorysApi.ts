import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";

const TEMP = ["heat_energy_node","auto_node","pump_station_node","electro_energy_node",] as const;

type SubcatType = "heat_energy_node" | "auto_node"| "pump_station_node"| "electro_energy_node"
export interface SubcategoryAnswer {
    id:number;
    name:string;
    subcategory_type:SubcatType;
    // subcategory_type:string;
    order_index:number;
    user_object:number;
    status:string;
    last_update:string;
}

interface ObjectAnswer {
    data:SubcategoryAnswer[];
    count:number;
}
const objectSubcategoryQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getObjectSubcategorys: build.query<ObjectAnswer,number>({
            query: (id) => {
                return {
                    url:"subcategory/"+id,
                };
            },
            providesTags: (result) =>
            // is result available?
                result
                    ? // successful query
                    [
                        { type: "Subcats", id: result.data[0].id },
                        { type: "Subcats", id: "LIST" },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: "Subcats", id: "LIST" }],
        }),
        editSubcatOrder:build.mutation<SubcategoryAnswer, Partial<SubcategoryAnswer> & Pick<SubcategoryAnswer, "id">>({
            query:({id,...patch})=>({
                url: `subcategory/${id}/edit`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Subcats", id }],
        })
    }),
    overrideExisting: false,
});

export const getObjectSubcategoryData = objectSubcategoryQuery.useGetObjectSubcategorysQuery;
export const editSubcatOrder = objectSubcategoryQuery.useEditSubcatOrderMutation;