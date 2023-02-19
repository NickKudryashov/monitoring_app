import classNames from "shared/lib/classNames/classNames";
import cls from "./AppButton.module.scss";
import type { PropsWithChildren } from "react";
import DarkIcon from "shared/assets/icons/darkIcon.svg";
interface AppButonProps {
 className?: string;
}

export function AppButon(props: PropsWithChildren<AppButonProps>) {
    const { className,children } = props;

    return (
        <button className={classNames(cls.AppButon,{},[className])}>
            <DarkIcon/>
            {children}
        </button>  
    );
}