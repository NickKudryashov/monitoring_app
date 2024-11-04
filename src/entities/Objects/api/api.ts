import { url } from "inspector";
import { rtkApi, Tags } from "@/shared/api/rtkApi";
import { ObjectResponse } from "../types/types";

const userObjectsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getObjectInfo:build.query<ObjectResponse,number>({
            query: (id) =>{
                return {
                    url:`objects/${id}`,
                }
            },
            providesTags: (result) => [({type: "UserObjects" as Tags, id: result?.id})]
        }),
        getAllObjects:build.query<ObjectResponse[],{showAll?:string}>({
            query: ({showAll}) =>{
                return {
                    url:`objects`,
                    params:{showAll}
                };
            },
            providesTags: (result) =>{
                    if (result) {
                        return [   
                            ...result.map((el)=>({type: "UserObjects" as Tags, id: el.id})),
                            { type: "UserObjects", id: "LIST" }
                        ]
                    }
                    return [{ type: "UserObjects", id: "LIST" }]},
        }),
        editObject:build.mutation<ObjectResponse, Partial<ObjectResponse> & Pick<ObjectResponse, "id">>({
            query:({id,...patch})=>({
                url: `objects/${id}`,
                method: "PUT",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "UserObjects", id}],
        }),
        createObject:build.mutation<ObjectResponse, Partial<ObjectResponse> & Pick<ObjectResponse, "name" | 'abonent' | 'address' >>({
            query:({...patch})=>({
                url: `objects/add`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "UserObjects", id:'LIST'}],
        })
    }),
    overrideExisting: false,
});

export const getUserObjectData = userObjectsApi.useGetObjectInfoQuery;
export const getAllObjects = userObjectsApi.useGetAllObjectsQuery;
export const editUserObject = userObjectsApi.useEditObjectMutation
export const createUserObject = userObjectsApi.useCreateObjectMutation