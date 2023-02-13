import classNames from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

import type { PropsWithChildren } from "react";

interface NavbarProps {
 className?: string;
}

export function Navbar(props: PropsWithChildren<NavbarProps>) {
    const { className } = props;

    return (
        <div className={classNames(cls.Navbar,{},[className])}>
            <div>
                <i  className={cls.blocks}>Добавить категорию</i>
                <i  className={cls.blocks}>Добавить объект</i>
                <i  className={cls.blocks}>Добавить прибор</i>
            </div>
            <div className={cls.blocks}>
                <i  className={cls.blocks}>Подписка до ##.##.2023</i>
                <i  className={cls.blocks}>Настройки</i>
                <i  className={cls.blocks}>Выход</i>
            </div>
        </div>
    );
}