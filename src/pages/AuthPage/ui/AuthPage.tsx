import classNames from "shared/lib/classNames/classNames";
import cls from "./AuthPage.module.scss";

import type { PropsWithChildren } from "react";
import { DefaultAuth } from "features/DefaultAuth/ui/DefaultAuth";
import { AuthWidget } from "widgets/AuthWidget/AuthWidget";

interface AuthPageProps {
 className?: string;
}

export function AuthPage(props: PropsWithChildren<AuthPageProps>) {
    const { className } = props;

    return (
        <div className={classNames(cls.AuthPage,{},[className])}>
            <AuthWidget/>
        </div>
    );
}