import { useEffect, useLayoutEffect, useState } from 'react'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { DetailView } from '@/widgets/DetailView'
import cls from './ActivatePage.module.scss'
import {
    defaultAuthCheck,
    getIsAuth,
    getUserData,
    useActivateQueryQuery,
    useSendEmailMutation,
} from '@/entities/user'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { App, Button, notification, Result, Skeleton } from 'antd'
import { RoutePathPublic } from '@/shared/config/RouteConfig/RouteConfig'
import { useSelector } from 'react-redux'
import { userActions } from '@/entities/user/Store/authReducer'
const ActivatePage = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [sec, setSec] = useState(3000)
    const { isSuccess, isUninitialized, isLoading, isError } = useActivateQueryQuery({
        access: params.get('access') ?? '',
        refresh: params.get('refresh') ?? '',
    })
    const [sendEmail, { isSuccess: emailSuccess, isUninitialized: emailUnit }] = useSendEmailMutation()
    useEffect(() => {
        dispatch(userActions.logout())
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            setSec((prev) => prev - 1000)
        }, 1000)
        if (sec <= 0 && interval) {
            clearInterval(interval)
        }
        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [isUninitialized, isSuccess])

    if (!isUninitialized && !isSuccess && sec <= 0) {
        const access = params.get('access') ?? ''
        const refresh = params.get('refresh') ?? ''
        if (!emailUnit) {
            sendEmail({ access, refresh })
            if (emailSuccess) {
                alert('письмо отправлено')
            }
        }

        navigate('/auth')
    }
    if (!isUninitialized && isSuccess && !isLoading && sec <= 0) {
        dispatch(userActions.activate())
        navigate('/')
    }
    // useEffect(() => {
    //     if (!isUninitialized && isSuccess && !isLoading) dispatch(userActions.activate())
    // }, [isUninitialized, isSuccess, isLoading])
    return (
        <div className={cls.ActivatePage}>
            {isLoading && <Skeleton />}
            {!isUninitialized && isSuccess && !isLoading && (
                <Result
                    status={'success'}
                    title={`Аккаунт успешно подтвержден, вы будете перенаправлены на страницу авторизации через ${sec / 1000}`}
                />
            )}
            {!isUninitialized && !isSuccess && !isLoading && (
                <Result
                    status={'error'}
                    title={`Аккаунт не подтвержден, вы будете перенаправлены на страницу авторизации через ${sec / 1000}`}
                />
            )}
            {!(params.get('access') && params.get('refresh')) && (
                <Result status={'error'} title={`Некорректная ссылка на активацию`}></Result>
            )}
        </div>
    )
}

export default ActivatePage
