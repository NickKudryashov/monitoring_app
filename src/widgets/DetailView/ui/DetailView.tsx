import classNames from 'shared/lib/classNames/classNames';
import cls from './DetailView.module.scss';

import type { PropsWithChildren } from 'react';
import { useAppSelector } from 'shared/hooks/hooks';
import { CategoryCard } from 'entities/Category';
import { ObjectCategoryView } from 'features/ObjectCategoryCardView';

interface DetailViewProps {
 className?: string;
}

export function DetailView(props: PropsWithChildren<DetailViewProps>) {
 const { className } = props;
 const {categories} = useAppSelector(state=>state.categoryReducer)
 return (
<div className={classNames(cls.DetailView,{},[className])}>
<ObjectCategoryView/>
</div>
 );
}