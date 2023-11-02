import { memo, useEffect } from "react";
import  classNames  from "shared/lib/classNames/classNames";
import cls from "./ObjectsDetailPage.module.scss";
import { DetailView } from "widgets/DetailView";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { Loader } from "shared/ui/Loader/Loader";
import { ObjectCard, objectsAllRequest } from "entities/Objects";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";

export interface ObjectsDetailPageProps {
 className?: string;
}

const ObjectsDetailPage = memo((props:ObjectsDetailPageProps) => {
    const { className } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let content;
    // if (!id) {
    //     navigate(RoutePathAuth.main);
    // }
    useEffect(()=>{
        dispatch(objectsAllRequest());
    },[]);
    
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    
    if (objects) {
        content = (
            <DetailView className={cls.detail}>
                {
                    objects.map((el)=>
                        <ObjectCategoryView key={el.id}  id={el.id} adress={el.name} />)
                }
            </DetailView>
        );
    }
    else {
        content = (
            <DetailView className={cls.detail}>
                <Loader/>
            </DetailView>
        );
    }
    

    return (
        <div className={classNames(cls.ObjectsDetailPage, {}, [className])}>
            {content}
        </div>
    );
});
ObjectsDetailPage.displayName="ObjectsDetailPage";

export default  ObjectsDetailPage;