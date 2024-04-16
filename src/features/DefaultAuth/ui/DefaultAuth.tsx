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
import { useNavigate } from "react-router-dom";
import { RoutePathAuth, RoutePathPublic } from "shared/config/RouteConfig/RouteConfig";

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
    const navigate = useNavigate();
    if (isAuth) {
        navigate(RoutePathAuth.main);
    }
    return (
        <div className={classNames(cls.DefaultAuth,{},[className])}>
            
            <p className={cls.formHeader}>ВХОД В ЛИЧНЫЙ КАБИНЕТ</p>
            <p>Нет аккаунта?</p>
            <div className={cls.textRow}>
                <p className={cls.linkToReg} onClick={()=>navigate(RoutePathPublic.reg)}>Зарегистрируйтесь</p>
                <p>в личном кабинете.</p>
            </div>
            <p>чтобы получить все преимущества обслуживания!</p>
            <AppInput className={cls.authInp} value={email} placeholder="Имя пользователя" onChange={e=>setEmail(e.target.value)} />
            <AppInput  className={cls.authInp} value={password} type="password" placeholder="Пароль" onChange={e=>setPassword(e.target.value)}/>
            <div className={cls.checkboxes}>
                <div className={cls.textCheckboxH}>
                    <AppCheckbox
                        checked={rememeberUser}
                        onChange={setRememberUser}
                        className={className}
                        label={"Оставаться в системе"}
                    />
                    <p className={cls.linkToReg}>Забыли пароль?</p>
                </div>
        
                <AppCheckbox
                    checked={rememeberUser}
                    onChange={setRememberUser}
                    className={className}
                    label={"Запомнить данные"}
                />

            </div>
            
            <AppButon className={cls.confirmButton} theme={AppButtonTheme.DESIGNED_PRIMARY} onClick={()=>{dispatch(defaultLogin({email,password})).then(res=>dispatch(getUserData()));}}>АВТОРИЗАЦИЯ</AppButon>
            <p className={cls.regRef} onClick={()=>navigate(RoutePathPublic.reg)}>Регистрация</p>
        </div>
    );
}