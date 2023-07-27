import classNames from "shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./CategoryRow.module.scss";
import MoveIcon from "shared/assets/icons/MoveIcon.svg";
import CrossIcon from "shared/assets/icons/CrossIcon.svg";
import SettingsIcon from "shared/assets/icons/SettingsIcon.svg";
import type { PropsWithChildren } from "react";

interface CategoryRowProps {
 className?: string;
 name?:string;
}

export const CategoryRow = memo((props: PropsWithChildren<CategoryRowProps>) => {
    const { className,name="Категория",children } = props;

    return (
        <div className={classNames(cls.main,{},[className])}>
            <div className={cls.inner}>
                <div draggable={true}  className={classNames(cls.CategoryRow,{},[])}>
                    <div className={cls.name}>{name}</div>
                    <div className={cls.btns}>
                        <MoveIcon  height={"20px"} width={"30px"}/>
                        <input type="checkbox"/>
                        <SettingsIcon height={"22px"} width={"30px"}/>
                        <CrossIcon height={"17.5px"} width={"30px"}/>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
});
