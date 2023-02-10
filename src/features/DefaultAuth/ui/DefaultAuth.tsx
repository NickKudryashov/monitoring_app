import classNames from 'shared/lib/classNames/classNames';
import cls from './DefaultAuth.module.scss';

import { PropsWithChildren, useState } from 'react';
import { AppInput } from 'shared/ui/AppInput/AppInput';
import { useAppDispatch, useAppSelector } from 'shared/hooks/hooks';
import { defaultLogin } from 'entities/user/Store/actionCreators';
import { AppCheckbox } from 'shared/ui/AppCheckbox/AppCheckbox';

interface DefaultAuthProps {
 className?: string;
} 

export function DefaultAuth(props: PropsWithChildren<DefaultAuthProps>) {
 const { className } = props;
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {isAuth} = useAppSelector(state=>state.userReducer)
    const [rememeberUser,setRememberUser] = useState(false)
    const dispatch = useAppDispatch()
 return (
    <div className={classNames(cls.DefaultAuth,{},[className])}>
        {isAuth ? <b>АВТОРИЗОВАН</b> : <b>НЕ АВТОРИЗОВАН</b>}
        <AppInput value={email} onChange={e=>setEmail(e.target.value)} />
        <AppInput value={password} onChange={e=>setPassword(e.target.value)}/>
        <AppCheckbox
            checked={rememeberUser}
            onChange={setRememberUser}
            className={className}
            label={"Запомнить данные"}
        />
        <button onClick={()=>dispatch(defaultLogin({email,password}))}>АВТОРИЗАЦИЯ</button>
    </div>
 );
}