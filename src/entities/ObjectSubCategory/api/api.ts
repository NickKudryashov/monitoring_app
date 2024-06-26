import { url } from "inspector";
import { rtkApi } from "shared/api/rtkApi";
import { SubcatTypes } from "../model/types/ObjectSubCategorySchema";


export const SubcategoryStatus = {
    no_answer:"no_answer",
    success:"success"
} as const;
export type SubcategoryStatus = typeof SubcategoryStatus [ keyof typeof  SubcategoryStatus]
export interface SubcategoryAnswer {
    id:number;
    name:string;
    subcategory_type:SubcatTypes;
    // subcategory_type:string;
    order_index:number;
    user_object:number;
    status:SubcategoryStatus;
    last_update:string;
    enabled:boolean;
}

export interface AddSubcategoryProps {
    name?:string;
    user_object:number;
    subcategory_type:string;
    // order_index:number;
}


interface ObjectAnswer {
    data:SubcategoryAnswer[];
    count:number;
}
const objectSubcategoryEntityQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getHeatDevIdBySubcat: build.query<{device:number},string>({
            query: (id) => {
                return {
                    url:"subcategory/"+id+"/heat",
                };
            },
        }),
        getAutoDevIdBySubcat: build.query<{device:number},string>({
            query: (id) => {
                return {
                    url:"subcategory/"+id+"/auto",
                };
            },
        }),
        getElectroDevIdBySubcat: build.query<{device:number},string>({
            query: (id) => {
                return {
                    url:"subcategory/"+id+"/electro",
                };
            },
        }),
        getPumpDevIdBySubcat: build.query<{device:number},string>({
            query: (id) => {
                return {
                    url:"subcategory/"+id+"/pump",
                };
            },
        }),
        getObjectSubcategorys: build.query<ObjectAnswer,number>({
            query: (id) => {
                return {
                    url:"subcategory/"+id,
                };
            },
            providesTags: (result) =>
            // is result available?
                result?.data.length
                    ? // successful query
                    [
                        ...result.data.map(({id})=>({ type: "Subcats", id } as const)),
                        { type: "Subcats", id: "LIST" },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: "Subcats", id: "LIST" }],
        }),
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
        }),
        editSubcatOrder:build.mutation<SubcategoryAnswer, Partial<SubcategoryAnswer> & Pick<SubcategoryAnswer, "id">>({
            query:({id,...patch})=>({
                url: `subcategory/${id}/edit`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Subcats", id }],
        }),
        toggleSubcat:build.mutation<SubcategoryAnswer, Partial<SubcategoryAnswer> & Pick<SubcategoryAnswer, "id">>({
            query:({id,...patch})=>({
                url: `subcategory/${id}/toggle`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Subcats", id }],
        }),
        deleteSubcat:build.mutation<SubcategoryAnswer, Partial<SubcategoryAnswer> & Pick<SubcategoryAnswer, "id">>({
            query:({id})=>({
                url: `subcategory/${id}/delete`,
                method: "POST",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Subcats", id }],
        })
    }),
    overrideExisting: false,
});

export const getHeatDeviceIdBySystem = objectSubcategoryEntityQuery.useGetHeatDevIdBySubcatQuery;
export const getAutoDeviceIdBySystem = objectSubcategoryEntityQuery.useGetAutoDevIdBySubcatQuery;
export const getElectroDeviceIdBySystem = objectSubcategoryEntityQuery.useGetElectroDevIdBySubcatQuery;
export const getPumpDeviceIdBySystem = objectSubcategoryEntityQuery.useGetPumpDevIdBySubcatQuery;

export const deleteSubcat = objectSubcategoryEntityQuery.useDeleteSubcatMutation;
export const getObjectSubcategoryData = objectSubcategoryEntityQuery.useGetObjectSubcategorysQuery;
export const editSubcatOrder = objectSubcategoryEntityQuery.useEditSubcatOrderMutation;
export const addNewSubcategory = objectSubcategoryEntityQuery.useAddNewSubcatMutation;
export const getSubcategoryTypes = objectSubcategoryEntityQuery.useGetSubcategoryTypesQuery;
export const toggleSubcat = objectSubcategoryEntityQuery.useToggleSubcatMutation;