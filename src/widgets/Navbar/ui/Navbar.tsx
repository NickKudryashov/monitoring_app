import classNames from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

import { PropsWithChildren, useCallback, useState } from "react";
import { AddCategory } from "features/AddCategory";
import { AddObject } from "features/AddObject";
import { AddHeatDevice } from "features/AddHeatDevice";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import { userSlice } from "entities/user/Store/authReducer";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import DropdownIcon from "shared/assets/icons/dropdownIcon.svg";
import { Modal } from "shared/ui/Modal/Modal";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";

interface NavbarProps {
 className?: string;
}

export function Navbar(props: PropsWithChildren<NavbarProps>) {
    const { className } = props;
    const email = useSelector((state:StateSchema)=>state.user.userdata?.name);
    const [settingsDropdownOpened,setSettingsDropdownOpened] = useState(false);
    const [categoryFormOpened,setCategoryFormOpened] = useState(false);
    const [objectFormOpened,setObjectFormOpened] = useState(false);
    const [heatDeviceFormOpened,setHeatDeviceFormOpened] = useState(false);
    const dispatch = useAppDispatch();
    const items = [
        {text:"Добавить категорию",onClick:()=>setCategoryFormOpened(true)},
        {text:"Добавить объект",onClick:()=>setObjectFormOpened(true)},
        {text:"Добавить прибор",onClick:()=>setHeatDeviceFormOpened(true)}
    ];
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

            <div className={cls.blocks_group}>
                <div  className={cls.blocks}>Подписка до ##.##.2023</div>
                {/* <div onClick={()=>setSettingsDropdownOpened(prev=>!prev)} className={cls.blocks}>Настройки 
                    <DropdownMenu 
                        opened={settingsDropdownOpened} 
                        onClose={()=>setSettingsDropdownOpened(false)}
                        items={items}
                    /></div> */}
                <DropdownMenu 
                    header={"Настройки"} 
                    items={items}
                    Icon={DropdownIcon}
                    rotateIcon={true}
                />
                <div  className={cls.blocks}>{`Вы вошли как ${email}`}</div>
                <AddCategory onClose={acceptCategory} isOpen={categoryFormOpened}/>
                <AddObject onClose={acceptObject} isOpen={objectFormOpened}/>
                <AddHeatDevice onClose={acceptHeatDevice} isOpen={heatDeviceFormOpened}/>
                <div onClick={()=>dispatch(userSlice.actions.logout())}  className={cls.blocks}>Выход</div>
            </div>
        </div>
    );
}