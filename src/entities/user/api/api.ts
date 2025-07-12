import { rtkApi } from '@/shared/api/rtkApi'
import { GSMConnection, InternetConnection } from '@/shared/types/connectionTypes'

export interface PersonalAccountData {
    username: string
    password: string
    personal_account: true
    email: string
    phonenumber: string
    first_name: string
    surname: string
    patronymic: string
    birth_date: string
    location: string
}

export interface CompanyAccountData {
    username: string
    password: string
    personal_account: false
    email: string
    phonenumber: string
    full_name: string
    inn: string
    kpp: string
    employer_name: string
    employer_profession: string
    official_adress: string
    actual_adress: string
}
interface User {
    id: number
    comment?: string
    banned: boolean
}

type Args = PersonalAccountData | CompanyAccountData
export const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<void, Args>({
            query: (body) => {
                return {
                    headers: {},
                    url: `auth-signup/`,
                    method: 'POST',
                    body: body,
                }
            },
        }),
        activateQuery: build.query<GSMConnection | InternetConnection, { access: string; refresh: string }>({
            query: ({ access, refresh }) => {
                return {
                    url: `verify-email/`,
                    params: { access, refresh },
                }
            },
        }),
        sendEmail: build.mutation<{}, { access: string; refresh: string }>({
            query: ({ access, refresh }) => {
                return {
                    url: `send_email/`,
                    params: { access, refresh },
                    method: 'POST',
                }
            },
        }),
        checkPassword: build.mutation<{ valid: boolean }, { password: string }>({
            query: (body) => {
                return {
                    url: `user/check_password`,
                    method: 'POST',
                    body,
                }
            },
        }),
        editUser: build.mutation<void, { id: number; comment?: string; banned?: boolean }>({
            query: ({ id, ...rest }) => {
                return {
                    url: `user/manage/${id}`,
                    method: 'POST',
                    body: rest,
                }
            },
            invalidatesTags: () => [{ type: 'UserList', id: 'LIST' }],
        }),
        deleteUser: build.mutation<void, Pick<User, 'id'>>({
            query: ({ id }) => {
                return {
                    url: `user/manage/${id}`,
                    method: 'delete',
                }
            },
            invalidatesTags: () => [{ type: 'UserList', id: 'LIST' }],
        }),
        userListQuery: build.query<User[], void>({
            query: () => {
                return {
                    url: `user/manage`,
                }
            },
            providesTags: () => [{ type: 'UserList', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useRegisterMutation,
    useActivateQueryQuery,
    useSendEmailMutation,
    useCheckPasswordMutation,
    useDeleteUserMutation,
    useEditUserMutation,
    useUserListQueryQuery,
} = userApi
