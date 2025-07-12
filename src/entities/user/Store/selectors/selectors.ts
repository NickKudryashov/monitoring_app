import { StateSchema } from '@/app/providers/StoreProvider/config/stateSchema'

export const getIsAuth = (state: StateSchema) => state.user.isAuth
export const getVersion = (state: StateSchema) => state.user.version
export const getUserName = (state: StateSchema) => state.user?.userdata?.name
export const getUserBanned = (state: StateSchema) => state.user?.userdata?.banned
export const getUserComment = (state: StateSchema) => state.user?.userdata?.comment
export const getUserSuperuser = (state: StateSchema) => state.user?.userdata?.superuser
