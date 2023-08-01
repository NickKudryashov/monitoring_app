import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./Footer.module.scss";

import type { PropsWithChildren } from "react";

interface FooterProps {
 className?: string;
}

export const Footer = memo((props: PropsWithChildren<FooterProps>) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Footer,{},[className])}>
            ver 2.0.0 03.07.2023
        </div>
    );
});
