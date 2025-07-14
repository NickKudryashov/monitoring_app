import { rtkApi } from '@/shared/api/rtkApi'
import { GSMConnection, InternetConnection } from '@/shared/types/connectionTypes'
import { UserData } from '../Models/User'

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
export interface User {
    id: number
    comment?: string
    banned: boolean
    username: string
    email: string
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
        userInfo: build.query<UserData, void>({
            query: () => {
                return {
                    url: `user/`,
                }
            },
            providesTags: () => [{ type: 'UserList', id: 'LIST' }],
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
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                // Находим эндпоинт, который мы хотим обновить - userListQuery
                const patchResult = dispatch(
                    userApi.util.updateQueryData('userListQuery', undefined, (draft) => {
                        // `draft` - это текущие данные в кэше, в твоем случае это { users: User[] }
                        // Находим нужного пользователя в массиве
                        const user = draft.users.find((user) => user.id === id)
                        if (user) {
                            // Обновляем поля пользователя данными из нашего patch-запроса
                            Object.assign(user, patch)
                        }
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    // Если мутация провалилась - откатываем наши оптимистичные изменения
                    patchResult.undo()
                }
            },
            invalidatesTags: () => [{ type: 'UserList', id: 'LIST' }],
        }),
        deleteUser: build.mutation<void, Pick<User, 'id'>>({
            query: ({ id }) => {
                return {
                    url: `user/manage/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: () => [{ type: 'UserList', id: 'LIST' }],
        }),
        userListQuery: build.query<{ users: User[] }, void>({
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
    useUserInfoQuery,
} = userApi
