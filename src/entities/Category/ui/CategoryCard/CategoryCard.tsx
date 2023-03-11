import classNames from "shared/lib/classNames/classNames";
import cls from "./CategoryCard.module.scss";
import type { PropsWithChildren } from "react";

interface CategoryCardProps {
 className?: string;
 name:string;
 onClick?:(e:React.MouseEvent<HTMLElement>)=>void
}

export function CategoryCard(props: PropsWithChildren<CategoryCardProps>) {
    const { className,name,onClick } = props;
    return (
        <div onClick={onClick} className={classNames(cls.CategoryCard,{},[className,cls.cardContent])}>
            <b>{name}</b>
        </div>
    );
}