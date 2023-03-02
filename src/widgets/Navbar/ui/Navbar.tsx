import classNames from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

import { PropsWithChildren, useCallback, useState } from "react";
import { AddCategory } from "features/AddCategory";
import { AddObject } from "features/AddObject";
import { AddHeatDevice } from "features/AddHeatDevice";

interface NavbarProps {
 className?: string;
}

export function Navbar(props: PropsWithChildren<NavbarProps>) {
    const { className } = props;

    return (
        <div className={classNames(cls.Navbar,{},[className])}>

            <div className={cls.blocks_group}>
                <div  className={cls.blocks}>Подписка до ##.##.2023</div>
                <div  className={cls.blocks}>Настройки</div>
                <div  className={cls.blocks}>Выход</div>
            </div>
        </div>
    );
}