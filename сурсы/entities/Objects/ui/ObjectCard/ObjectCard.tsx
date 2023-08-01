import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectCard.module.scss";

import type { PropsWithChildren } from "react";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useSelector } from "react-redux";

interface ObjectCardProps {
 className?: string;
 name:string;
 onClick?:(e:React.MouseEvent<HTMLElement>)=>void;
}

export function ObjectCard(props: PropsWithChildren<ObjectCardProps>) {
    const { className,name,children, onClick } = props;
    const {categories} = useSelector((state:StateSchema)=>state.category);
    return ( 
        <div onClick={onClick} className={classNames(cls.ObjectCard,{},[className,])}>
            <b className={cls.cardContent}>{name}</b>
        </div>
    );
}