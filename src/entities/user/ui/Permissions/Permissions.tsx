import { ReactNode } from 'react'
import { getUserSuperuser } from '../../Store/selectors/selectors'
import { useSelector } from 'react-redux'

interface PermissionProps {
    children?: ReactNode
    fallback?: ReactNode
}
export const Permissions = ({ children = null, fallback = null }: PermissionProps) => {
    const isSuperUser = useSelector(getUserSuperuser)
    if (isSuperUser) return children
    return fallback
}
