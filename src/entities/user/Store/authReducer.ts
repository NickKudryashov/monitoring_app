import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '../Models/User'
import { DefaultAuthCheckResponse, DefaultAuthResponse } from '../types/types'
import { defaultAuthCheck, defaultLogin, getUserData, getVersion } from './actionCreators'
import { buildSlice } from '@/shared/store'
import { userApi } from '../api/api'

export interface UserState {
    isAuth: boolean
    licenseAccepted: boolean
    rulesAccepted: boolean
    personalDataAccepted: boolean
    userdata?: UserData
    version?: string
    name?: string
    id?: number
    is_active?: boolean
}

const initialState: UserState = {
    isAuth: false,
    licenseAccepted: false,
    rulesAccepted: false,
    personalDataAccepted: false,
    version: '',
}

export const userSlice = buildSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false
            localStorage.setItem('access_token', '')
            localStorage.setItem('refresh_token', '')
            state.userdata = undefined
        },
        activate(state) {
            state.userdata = { is_active: true, banned: false, comment: '', superuser: false }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(defaultLogin.fulfilled.type, (state, action: PayloadAction<DefaultAuthResponse>) => {
                state.isAuth = true
                localStorage.setItem('access_token', action.payload.access)
                localStorage.setItem('refresh_token', action.payload.refresh)
            })
            .addCase(defaultLogin.rejected.type, (state, action) => {
                state.isAuth = false
            })
            .addCase(
                defaultAuthCheck.fulfilled.type,
                (state, action: PayloadAction<DefaultAuthCheckResponse>) => {
                    state.isAuth = true
                    localStorage.setItem('access_token', action.payload.access)
                    localStorage.setItem('refresh_token', action.payload.refresh)
                },
            )
            .addCase(
                defaultAuthCheck.rejected.type,
                (state, action: PayloadAction<DefaultAuthCheckResponse>) => {
                    state.isAuth = false
                },
            )
            .addCase(getUserData.fulfilled.type, (state, action: PayloadAction<UserData>) => {
                state.userdata = action.payload
            })
            .addCase(getVersion.fulfilled.type, (state, action: PayloadAction<string>) => {
                state.version = action.payload
            })
            .addMatcher(userApi.endpoints.userInfo.matchFulfilled, (state, data) => {
                state.userdata = data.payload
            })
    },
})

// export const userReducer = userSlice.reducer;
export const { reducer: userReducer, actions: userActions, useActions: useUserActions } = userSlice
