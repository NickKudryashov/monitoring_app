import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./AppLink.module.scss";

import type { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";

interface AppLinkProps extends LinkProps {
 className?: string;
}

export const AppLink = memo((props: PropsWithChildren<AppLinkProps>) => {
    const { className,children,to,...otherprops } = props;

    return (
        <Link 
            to={to} 
            className={classNames(cls.AppLink,{},[className])}
            {...otherprops}
        >
            {children}
        </Link>
    );
});
