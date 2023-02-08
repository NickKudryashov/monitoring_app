import classNames from 'shared/lib/classNames/classNames';
import cls from './AuthWidget.module.scss';

import type { PropsWithChildren } from 'react';
import { AppTab } from 'shared/ui/AppTab/AppTab';
import { AboutPage } from 'pages/AboutPage';
import { DefaultAuth } from 'pages/AuthPage';

interface AuthWidgetProps {
 className?: string;
}

export function AuthWidget(props: PropsWithChildren<AuthWidgetProps>) {
 const { className } = props;

 return (
    <div className={classNames(cls.AuthWidget,{},[className])}>
        <AppTab
            tabs={[{name:'Регистрация',Content:AboutPage,contentProps:{}},{name:'Авторизация',Content:DefaultAuth,contentProps:{}}]}
        />
    </div>
 );
}