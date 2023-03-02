import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectCard.module.scss";

import type { PropsWithChildren } from "react";
import { useAppSelector } from "shared/hooks/hooks";

interface ObjectCardProps {
 className?: string;
 name:string;
 onClick?:(e:React.MouseEvent<HTMLElement>)=>void;
}

export function ObjectCard(props: PropsWithChildren<ObjectCardProps>) {
    const { className,name,children, onClick } = props;
    const {categories} = useAppSelector(state=>state.categoryReducer);
    return ( 
        <div onClick={onClick} className={classNames(cls.ObjectCard,{},[className])}>
            <b>{name}</b>
        </div>
    );
}