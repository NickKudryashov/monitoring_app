import classNames from "shared/lib/classNames/classNames";
import cls from "./DefaultAuth.module.scss";

import { PropsWithChildren, useEffect, useState } from "react";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { useAppDispatch } from "shared/hooks/hooks";
import { defaultLogin, getUserData } from "entities/user/Store/actionCreators";
import { AppCheckbox } from "shared/ui/AppCheckbox/AppCheckbox";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { Modal } from "shared/ui/Modal/Modal";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { userReducer } from "entities/user";
import { useSelector } from "react-redux";

interface DefaultAuthProps {
 className?: string;
} 

export function DefaultAuth(props: PropsWithChildren<DefaultAuthProps>) {
    const { className } = props;
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const isAuth = useSelector((state:StateSchema)=>state.user.isAuth);
    const [rememeberUser,setRememberUser] = useState(false);
    const dispatch = useAppDispatch();

    return (
        <div className={classNames(cls.DefaultAuth,{},[className])}>
            Авторизация
            <AppInput value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)} />
            <AppInput value={password} type="password" placeholder="Пароль" onChange={e=>setPassword(e.target.value)}/>
            <AppCheckbox
                checked={rememeberUser}
                onChange={setRememberUser}
                className={className}
                label={"Запомнить данные"}
            />
            <AppButon theme={AppButtonTheme.AUTH} onClick={()=>{dispatch(defaultLogin({email,password}));}}>АВТОРИЗАЦИЯ</AppButon>
        </div>
    );
}