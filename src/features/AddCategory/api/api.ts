import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
export interface SubcategoryAnswer {
    id:number;
    name:string;
    subcategory_type:string | null;
    order_index:number;
    user_object:number;
    status:string;
}

export interface AddSubcategoryProps {
    name:string;
    user_object:number;
    subcategory_type:string;
    // order_index:number;
}
const objectSubcategoryQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSubcategoryTypes:build.query<Record<string,string>,void>({
            query:()=>({
                url:"subcategory/types"
            })
        }),
        addNewSubcat:build.mutation<SubcategoryAnswer, AddSubcategoryProps>({
            query:(body)=>({
                url: "subcategory/create",
                method: "POST",
                body: body,
            }),
            invalidatesTags: (result, error) => [{ type: "Subcats", id:"LIST" }],
        })
    }),
    overrideExisting: false,
});

export const addNewSubcategory = objectSubcategoryQuery.useAddNewSubcatMutation;
export const getSubcategoryTypes = objectSubcategoryQuery.useGetSubcategoryTypesQuery;