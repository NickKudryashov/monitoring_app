import { defaultAuthCheck, getIsAuth, getUserData } from '@/entities/user'
import { Suspense, useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { RouteConfigPublic, RouteConfigAuth } from '../config/RouteConfig'
import { MainLayoutPageLoader } from '@/pages/MainLayoutPageLoader'
import { MainLayout } from '@/shared/ui/MainLayout/MainLayout'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { getVersion } from '@/entities/user/Store/actionCreators'
import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { RoutePathAuth, RoutePathPublic } from '@/shared/config/RouteConfig/RouteConfig'
import { StateSchema } from '../../StoreProvider/config/stateSchema'
import { App, Result } from 'antd'
import { userActions } from '@/entities/user/Store/authReducer'
import { Link } from 'react-router-dom'
import ActivatePage from '@/pages/ActivatePage/ActivatePage'
import { AuthPage } from '@/pages/AuthPage/ui/AuthPage'
import { getUserBanned, getUserComment } from '@/entities/user/Store/selectors/selectors'

export const AppRouter = () => {
    const isAuth = useSelector(getIsAuth)
    const dispatch = useAppDispatch()
    const isMobile = useMobilDeviceDetect()
    const navigate = useNavigate()
    const isActive = useSelector((state: StateSchema) => state.user.userdata?.is_active)
    const { notification } = App.useApp()
    const banned = useSelector(getUserBanned)
    const comment = useSelector(getUserComment)
    useEffect(() => {
        if (!isAuth) {
            dispatch(defaultAuthCheck())
        }
        dispatch(getUserData())

        dispatch(getVersion())
    }, [isAuth])
    // if (!isAuth && isMobile) {
    //     navigate(RoutePathPublic.auth)
    // }
    if (isAuth && banned) return <Result title={'Ваш аккаунт заблокирован'} subTitle={comment} />
    return (
        <Suspense fallback={<MainLayoutPageLoader />}>
            <Routes>
                {isAuth &&
                    isActive &&
                    Object.values(RouteConfigAuth).map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <div className='page-wrapper'>
                                    <MainLayout
                                        navbar={<Navbar />}
                                        sidebar={<Sidebar />}
                                        DetailView={element}
                                    />
                                </div>
                            }
                        />
                    ))}
                {isAuth && !isActive && <Route path='*' element={<AuthPage />} />}
                {!isAuth &&
                    Object.values(RouteConfigPublic).map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
            </Routes>
        </Suspense>
    )
}
