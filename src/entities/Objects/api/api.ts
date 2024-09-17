import { url } from "inspector";
import { rtkApi } from "@/shared/api/rtkApi";
import { ObjectResponse } from "../types/types";

const userObjectsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getObjectInfo:build.query<ObjectResponse,number>({
            query: (id) =>{
                return {
                    url:`objects/${id}`,
                };
            }
        }),
    }),
    overrideExisting: false,
});

export const getUserObjectData = userObjectsApi.useGetObjectInfoQuery;