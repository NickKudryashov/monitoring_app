import { url } from 'inspector'
import { rtkApi } from '@/shared/api/rtkApi'
export interface GSMTask {
    name: string
    id: number
}
type ResponseList = { tasks: GSMTask[] }
const gsmTasksApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTaskList: build.query<ResponseList, void>({
            query: () => {
                return {
                    url: `connection/gsm_list`,
                }
            },
            providesTags: (result) => [{ type: 'GsmTasks', id: 'LIST' }],
        }),
        removeTaks: build.mutation<{}, { id: number }>({
            query: (body) => {
                return {
                    url: `connection/gsm_list/delete/${body.id}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: (result, error, arg, meta) => [{ type: 'GsmTasks', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const { useGetTaskListQuery, useRemoveTaksMutation } = gsmTasksApi
