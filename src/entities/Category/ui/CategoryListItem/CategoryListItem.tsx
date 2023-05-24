import classNames from "shared/lib/classNames/classNames";
import cls from "./CategoryListItem.module.scss";

import { PropsWithChildren, useState } from "react";
import { CategoryResponse } from "entities/Category/types/types";
import { getCategoryByID } from "entities/Category/lib/helpers";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePathAuth, RoutePathPublic } from "shared/config/RouteConfig/RouteConfig";
interface CategoryListItemProps {
 className?: string;
 id?:number;
 onCategoryClickHandler: (cat:CategoryResponse)=>void;
 Component?:()=>React.ReactNode;
}

export function CategoryListItem(props: PropsWithChildren<CategoryListItemProps>) {
    const { className,id,children,onCategoryClickHandler,Component } = props;
    const {categories} = useSelector((state:StateSchema)=>state.category);
    const currentCategory = getCategoryByID(categories,id);
    const [menu,setMenu] = useState(false);
    const mods:Record<string,boolean> = {
        [cls.selected]:currentCategory.expanded
    };

    return (
        <div className={classNames(cls.CategoryListItem,mods,[className])}>
            {/* {categories.map(element=>element.parentID===parentID &&  */}
            <div  key={id}>
                <div className={cls.textWithIcon} >
                    <div onClick={()=>onCategoryClickHandler(currentCategory)} >
                        <AppLink to={RoutePathAuth.category+id}>
                            {currentCategory.name}
                        </AppLink>
                    </div>
                    {Component()}

                </div>
                {/* {element.expanded && 
                <CategoryListItem  parentID={element.id} onCategoryClickHandler={onCategoryClickHandler} />
                } */}
                {currentCategory.expanded && children}
            </div>
            {/* )} */}
        </div>
    );
}