import classNames from "shared/lib/classNames/classNames";
import cls from "./List.module.scss";

import type { PropsWithChildren } from "react";

interface ListProps<T> {
 className?: string;
 items:T[];
 renderItem:(items:T)=>React.ReactNode;
}

export function List<T>(props: PropsWithChildren<ListProps<T>>) {
    const { className,items,renderItem,children } = props;

    return (
        <div className={classNames(cls.List,{},[className])}>
            {items.map(renderItem)}
        </div>
    );
}