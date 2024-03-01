import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
    reducerPath: "baseApi",
    tagTypes:["Subcats",],
    baseQuery: fetchBaseQuery({
        baseUrl: __API__ ,
        prepareHeaders: headers=> {
            const token = `Bearer ${localStorage.getItem("access_token")}`;
            if (token) {
                headers.set("Authorization",token);
            }
            return headers;
        },
    }
    ),
    endpoints: () => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints