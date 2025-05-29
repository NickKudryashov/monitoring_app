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
    }),
    overrideExisting: false,
})

export const { useRegisterMutation, useActivateQueryQuery, useSendEmailMutation } = userApi
