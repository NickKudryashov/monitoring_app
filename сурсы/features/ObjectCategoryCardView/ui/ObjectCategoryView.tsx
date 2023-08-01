import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectCategoryView.module.scss";

import { PropsWithChildren, useEffect } from "react";
import { CategoryCard, CategoryItem, categorySlice, getCategoryByID} from "entities/Category";
import { ObjectCard, ObjectItem, objectSlice } from "entities/Objects";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { AppRoutesAuth, RoutePathAuth, RoutePathPublic } from "shared/config/RouteConfig/RouteConfig";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/hooks";

interface ObjectCategoryViewProps {
 className?: string;
 onObjectClick?:()=>void;
 category: CategoryItem;
 objectClickHandler?:(obj:ObjectItem)=>void;
 categoryClickHandler?:(cat:CategoryItem)=>void;
}

export function ObjectCategoryView(props: PropsWithChildren<ObjectCategoryViewProps>) {
    const { className,category,objectClickHandler,categoryClickHandler} = props;
    const {categories} = useSelector((state:StateSchema)=>state.category);
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(()=>{
        if (!category) {
            navigate(RoutePathAuth.main,{replace:true});
            return null;
        }
    },[category, navigate]);
    const selectCat = (cat:CategoryItem)=>{
        // setParentID(id); 
        // dispatch(openCat(id));
        dispatch(categorySlice.actions.openCat(cat.id));
        dispatch(categorySlice.actions.closeAllCatsExceptSelected(cat));
        // categoryClickHandler(cat);
    };
    const selectObj= (obj:ObjectItem)=>{
        // dispatch(openObj(id));
        dispatch(categorySlice.actions.closeAllCatsExceptSelectedWithoutParent(getCategoryByID(categories,obj.category)));
        dispatch(objectSlice.actions.closeAllObjExceptSelected(obj));
        // objectClickHandler?.(obj);
    };
    return (
        <div className={classNames(cls.ObjectCategoryView,{},[className])}>
            <div className={cls.cards}>{categories.map(cat=> cat.parentID===category.id &&
                <AppLink key={cat.id} to={RoutePathAuth.category+cat.id} >
                    <CategoryCard  key={cat.id} onClick={()=>selectCat(cat)} name={cat.name} /> 
                </AppLink>
            )                 
            }
            </div>
            <div className={cls.cards}>{objects.map(obj=> obj.category===category.id &&
            <AppLink key={obj.id} to={RoutePathAuth.object+obj.id} replace>
                <ObjectCard  key={obj.id} onClick={()=>selectObj(obj)}  name={obj.name} />
            </AppLink>
            )}</div>
        </div>
    );
}