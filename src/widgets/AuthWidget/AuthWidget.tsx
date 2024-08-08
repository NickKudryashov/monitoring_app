import classNames from "shared/lib/classNames/classNames";
import cls from "./AuthWidget.module.scss";

import type { PropsWithChildren } from "react";
import { DefaultAuth } from "pages/AuthPage";

interface AuthWidgetProps {
    className?: string;
}

export function AuthWidget(props: PropsWithChildren<AuthWidgetProps>) {
    const { className = "" } = props;

    return (
        <div className={classNames(cls.AuthWidget, {}, [className])}>
            <DefaultAuth />
        </div>
    );
}
