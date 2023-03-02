import classNames from "shared/lib/classNames/classNames";
import cls from "./CategoryListItem.module.scss";

import type { PropsWithChildren } from "react";
import { CategoryResponse } from "entities/Category/types/types";
import { getCategoryByID } from "entities/Category/lib/helpers";
import { useAppSelector } from "shared/hooks/hooks";

interface CategoryListItemProps {
 className?: string;
 id?:number;
 onCategoryClickHandler: (cat:CategoryResponse)=>void
}

export function CategoryListItem(props: PropsWithChildren<CategoryListItemProps>) {
    const { className,id,children,onCategoryClickHandler } = props;
    const {categories} = useAppSelector(state=>state.categoryReducer);
    const currentCategory = getCategoryByID(categories,id);
    const mods:Record<string,boolean> = {
        [cls.selected]:currentCategory.expanded
    };

    return (
        <div className={classNames(cls.CategoryListItem,mods,[className])}>
            {/* {categories.map(element=>element.parentID===parentID &&  */}
            <div key={id}>
                <div  onClick={()=>onCategoryClickHandler(currentCategory)}>{currentCategory.name}</div>
                {/* {element.expanded && 
                <CategoryListItem  parentID={element.id} onCategoryClickHandler={onCategoryClickHandler} />
                } */}
                {currentCategory.expanded && children}
            </div>
            {/* )} */}
        </div>
    );
}