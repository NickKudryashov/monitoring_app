import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectCategoryView.module.scss";

import { PropsWithChildren } from "react";
import { useAppSelector } from "shared/hooks/hooks";
import { CategoryCard, CategoryItem} from "entities/Category";
import { ObjectCard, ObjectItem } from "entities/Objects";

interface ObjectCategoryViewProps {
 className?: string;
 onObjectClick?:()=>void;
 category: CategoryItem;
 objectClickHandler:(obj:ObjectItem)=>void;
 categoryClickHandler:(cat:CategoryItem)=>void;
}

export function ObjectCategoryView(props: PropsWithChildren<ObjectCategoryViewProps>) {
    const { className,category,objectClickHandler,categoryClickHandler} = props;
    const {categories} = useAppSelector(state=>state.categoryReducer);
    const {objects} = useAppSelector(state=>state.objectReducer);
    const selectCat = (cat:CategoryItem)=>{
        // setParentID(id); 
        // dispatch(openCat(id));
        categoryClickHandler(cat);
    };
    const selectObj= (obj:ObjectItem)=>{
        // dispatch(openObj(id));
        objectClickHandler(obj);
    };
    return (
        <div className={classNames(cls.ObjectCategoryView,{},[className])}>
            <div className={cls.cards}>{categories.map(cat=> cat.parentID===category.id && <CategoryCard key={cat.id} onClick={()=>selectCat(cat)} name={cat.name} /> )}</div>
            <div className={cls.cards}>{objects.map(obj=> obj.category===category.id && <ObjectCard key={obj.id} onClick={()=>selectObj(obj)}  name={obj.name} />)}</div>
        </div>
    );
}