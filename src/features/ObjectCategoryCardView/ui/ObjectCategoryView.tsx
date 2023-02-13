import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectCategoryView.module.scss";

import { PropsWithChildren, useState } from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/hooks";
import { CategoryCard, categorySlice} from "entities/Category";
import { ObjectCard, objectSlice } from "entities/Objects";

interface ObjectCategoryViewProps {
 className?: string;
 onObjectClick?:()=>void;
}

export function ObjectCategoryView(props: PropsWithChildren<ObjectCategoryViewProps>) {
    const { className} = props;
    const {openCat} = categorySlice.actions;
    const {openObj} = objectSlice.actions;
    const [parentID,setParentID] = useState(0);
    const {categories} = useAppSelector(state=>state.categoryReducer);
    const {objects} = useAppSelector(state=>state.objectReducer);
    const dispatch = useAppDispatch();
 
    const selectCat = (id:number)=>{setParentID(id); dispatch(openCat(id));};
    const selectObj= (id:number)=>{dispatch(openObj(id));};
    return (
        <div className={classNames(cls.ObjectCategoryView,{},[className])}>
            <div className={cls.cards}>{categories.map(cat=> cat.parentID===parentID && <CategoryCard key={cat.id} onClick={()=>selectCat(cat.id)} name={cat.name} /> )}</div>
            <div className={cls.cards}>{objects.map(obj=> obj.category===parentID && <ObjectCard key={obj.id} onClick={()=>selectObj(obj.id)}  name={obj.name} />)}</div>
        </div>
    );
}