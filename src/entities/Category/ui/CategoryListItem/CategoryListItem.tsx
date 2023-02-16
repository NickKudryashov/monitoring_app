import classNames from "shared/lib/classNames/classNames";
import cls from "./CategoryListItem.module.scss";

import type { PropsWithChildren } from "react";
import { CategoryResponse } from "entities/Category/types/types";
import { getCategoryByID } from "entities/Category/lib/helpers";

interface CategoryListItemProps {
 className?: string;
 id?:number;
 onCategoryClickHandler: (cat:CategoryResponse)=>void
}

export function CategoryListItem(props: PropsWithChildren<CategoryListItemProps>) {
    const { className,id,children,onCategoryClickHandler } = props;
    const currentCategory = getCategoryByID(id);
    return (
        <div className={classNames(cls.CategoryListItem,{},[className])}>
            {/* {categories.map(element=>element.parentID===parentID &&  */}
            <div key={id}>
                <b  onClick={()=>onCategoryClickHandler(currentCategory)}>{currentCategory.name}</b>
                {/* {element.expanded && 
                <CategoryListItem  parentID={element.id} onCategoryClickHandler={onCategoryClickHandler} />
                } */}
                {currentCategory.expanded && children}
            </div>
            {/* )} */}
        </div>
    );
}