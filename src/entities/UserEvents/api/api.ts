import { rtkApi } from "@/shared/api/rtkApi";
import { UserEvent, UserEventProcessing } from "../model/types/type";



const userEventsQuery = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserEvent:build.query<UserEvent,number>({
            query: (id) =>{
                return {
                    url:`user_event/${id}`,
                };
            },
            providesTags:(result)=>[{ type: "UserEvents", id: result?.id }]

        }),
        getUserEventsTypes:build.query<Record<string,string>,void>({
            query: () =>{
                return {
                    url:"user_event/types",
                };
            }
        }),
        getUserEventProcessingHeat:build.query<UserEventProcessing[],number>({
            query: (id) =>{
                return {
                    url:`user_event/heat_processing/${id}`,
                };
            },

        }),
        getUserEventProcessingAuto:build.query<UserEventProcessing[],number>({
            query: (id) =>{
                return {
                    url:`user_event/auto_processing/${id}`,
                };
            },

        }),
        getUserEventProcessingPump:build.query<UserEventProcessing[],number>({
            query: (id) =>{
                return {
                    url:`user_event/pump_processing/${id}`,
                };
            },

        }),
        getUserEventsHeat:build.query<UserEvent[],number>({
            query: (id) =>{
                return {
                    url:`user_event/heat/${id}`,
                };
            },
            providesTags:(result) =>
                result?.length
                    ? 
                    [
                        ...result.map(({id})=>({ type: "UserEvents", id } as const)),
                        { type: "UserEvents", id: "LIST" },
                    ]
                    : 
                    [{ type: "UserEvents", id: "LIST" }]
        }),
        getUserEventsAuto:build.query<UserEvent[],number>({
            query: (id) =>{
                return {
                    url:`user_event/auto/${id}`,
                };
            },
            providesTags:(result) =>
                result?.length
                    ? 
                    [
                        ...result.map(({id})=>({ type: "UserEvents", id } as const)),
                        { type: "UserEvents", id: "LIST" },
                    ]
                    : 
                    [{ type: "UserEvents", id: "LIST" }]
        }),
        getUserEventsPump:build.query<UserEvent[],number>({
            query: (id) =>{
                return {
                    url:`user_event/pump/${id}`,
                };
            },
            providesTags:(result) =>
                result?.length
                    ? 
                    [
                        ...result.map(({id})=>({ type: "UserEvents", id } as const)),
                        { type: "UserEvents", id: "LIST" },
                    ]
                    : 
                    [{ type: "UserEvents", id: "LIST" }]
        }),
        editUserEvent:build.mutation<UserEvent, Partial<UserEvent> & Pick<UserEvent, "id">>({
            query:({id,...patch})=>({
                url: `user_event/${id}`,
                method: "PUT",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "UserEvents", id }],
        }),
        deleteUserEvent:build.mutation<UserEvent, Partial<UserEvent> & Pick<UserEvent, "id">>({
            query:({id,...patch})=>({
                url: `user_event/${id}`,
                method: "DELETE",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "UserEvents", id }],
        }),
        createUserEvent:build.mutation<UserEvent, Partial<UserEvent>>({
            query:(body)=>({
                url: "user_event/create",
                method: "POST",
                body: body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "UserEvents", id:"LIST" }],
        }),
    }),
    overrideExisting: false,
});

export const getUserEventById = userEventsQuery.useGetUserEventQuery;
export const getUserEventsTypes = userEventsQuery.useGetUserEventsTypesQuery;

export const getUserEventsByHeat=userEventsQuery.useGetUserEventsHeatQuery;
export const getUserEventsByAuto=userEventsQuery.useGetUserEventsAutoQuery;
export const getUserEventsByPump=userEventsQuery.useGetUserEventsPumpQuery;

export const getUserEventsProcessingByHeat=userEventsQuery.useGetUserEventProcessingHeatQuery;
export const getUserEventsProcessingByAuto=userEventsQuery.useGetUserEventProcessingAutoQuery;
export const getUserEventsProcessingByPump=userEventsQuery.useGetUserEventProcessingPumpQuery;


export const editUserEvent = userEventsQuery.useEditUserEventMutation;
export const deleteUserEvent = userEventsQuery.useDeleteUserEventMutation;
export const createUserEvent = userEventsQuery.useCreateUserEventMutation;