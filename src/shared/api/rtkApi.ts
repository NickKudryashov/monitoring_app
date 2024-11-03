import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
const baseQuery = fetchBaseQuery({
    baseUrl: __API__ ,
    prepareHeaders: headers=> {
        const token = `Bearer ${localStorage.getItem("access_token")}`;
        if (token) {
            headers.set("Authorization",token);
        }
        return headers;
    },
}
);
export type Tags = "Subcats" | "HeatDevice" | "Upcols" | "Downcols" | "ReportParameters" | "HeatPeriods" | "HeatReportFiles" | "UserEvents" | "UserObjects"
interface Error {
    message?:string;
}
export interface ApiErrorResponse {
    status:number;
    data?:Error;
}
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
    // try to get a new token
        const refresh = localStorage.getItem("refresh_token");
        const response = await axios.post(`${__API__}auth-refresh/`,{withCredentials:true,refresh});
        localStorage.setItem("access_token",response.data.access);
        // store the new token
        //   api.dispatch()
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
    }
    return result;
};
// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
    reducerPath: "baseApi",
    tagTypes:["Subcats","HeatDevice","Upcols","Downcols","ReportParameters","HeatPeriods","HeatReportFiles","UserEvents",'UserObjects'],
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),    
});



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints