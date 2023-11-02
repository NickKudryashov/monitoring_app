import classNames from "shared/lib/classNames/classNames";
import cls from "./AuthPage.module.scss";

import type { PropsWithChildren } from "react";
import { AuthWidget } from "widgets/AuthWidget/AuthWidget";
import { Navbar } from "widgets/Navbar";
import AuthLogoIcon from "shared/assets/icons/AuthLogoIcon.svg";
interface AuthPageProps {
 className?: string;
}

export function AuthPage(props: PropsWithChildren<AuthPageProps>) {
    const { className } = props;

    return (
        <div className={classNames(cls.AuthPage,{},[className])}>
            <Navbar className={cls.navbar} isAuth={false}/>
            <AuthLogoIcon/>
            <div className={cls.form}>
                <AuthWidget/>
            </div>
        </div>
    );
}