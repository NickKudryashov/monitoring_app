import classNames from 'shared/lib/classNames/classNames';
import cls from './CategoryCard.module.scss';

import type { PropsWithChildren } from 'react';
import { useAppSelector } from 'shared/hooks/hooks';

interface CategoryCardProps {
 className?: string;
 name:string;
 onClick?:(e:React.MouseEvent<HTMLElement>)=>void
}

export function CategoryCard(props: PropsWithChildren<CategoryCardProps>) {
 const { className,name,children, onClick } = props;
 const {categories} = useAppSelector(state=>state.categoryReducer)
 return (
<div onClick={onClick} className={classNames(cls.CategoryCard,{},[className])}>
    <b>{name}</b>
</div>
 );
}