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
    const [categoryFormOpened,setCategoryFormOpened] = useState(false);
    const [objectFormOpened,setObjectFormOpened] = useState(false);
    const [heatDeviceFormOpened,setHeatDeviceFormOpened] = useState(false);
    const acceptCategory = useCallback(() => {
        setCategoryFormOpened(false);
    },[]);
    const acceptObject = useCallback(() => {
        setObjectFormOpened(false);
    },[]);
    const acceptHeatDevice = useCallback(() => {
        setHeatDeviceFormOpened(false);
    },[]);
    return (
        <div className={classNames(cls.Navbar,{},[className])}>
            <AddCategory onClose={acceptCategory} isOpen={categoryFormOpened}/>
            <AddObject onClose={acceptObject} isOpen={objectFormOpened}/>
            <AddHeatDevice onClose={acceptHeatDevice} isOpen={heatDeviceFormOpened}/>
            <div>
                <i  onClick={()=>setCategoryFormOpened(true)} className={cls.blocks}>Добавить категорию</i>
                <i  onClick={()=>setObjectFormOpened(true)}className={cls.blocks}>Добавить объект</i>
                <i  onClick={()=>setHeatDeviceFormOpened(true)} className={cls.blocks}>Добавить прибор</i>
            </div>
            <div className={cls.blocks}>
                <i  className={cls.blocks}>Подписка до ##.##.2023</i>
                <i  className={cls.blocks}>Настройки</i>
                <i  className={cls.blocks}>Выход</i>
            </div>
        </div>
    );
}