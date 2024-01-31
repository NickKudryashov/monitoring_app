import { memo, useEffect, useState } from "react";
import  classNames  from "shared/lib/classNames/classNames";
import cls from "./ObjectsDetailPage.module.scss";
import { DetailView } from "widgets/DetailView";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { Loader } from "shared/ui/Loader/Loader";
import { ObjectCard, objectsAllRequest } from "entities/Objects";
import { ObjectCategoryRowView, ObjectCategoryView } from "features/ObjectCategoryCardView";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { getObjectSubcategoryData } from "features/ObjectCategoryCardView/api/objectSubcategorysApi";

export interface ObjectsDetailPageProps {
 className?: string;
}

const ObjectsDetailPage = memo((props:ObjectsDetailPageProps) => {
    const { className } = props;
    const [defaultView,setDefaultView] = useState(true);
    const [openedID,setOpened] = useState(0);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let content;
    const onKeyDown = ({ctrlKey,metaKey,key,repeat}:KeyboardEvent) => {
        if (repeat) return;
        // Handle both, `ctrl` and `meta`.
        if ((metaKey || ctrlKey) && key === "0") {
            setDefaultView((prev)=>!prev);
        }
    };
    // if (!id) {
    //     navigate(RoutePathAuth.main);
    // }
    useEffect(()=>{
        dispatch(objectsAllRequest());
        
        document.addEventListener("keydown",onKeyDown);
        return ()=>{
            document.removeEventListener("keydown",onKeyDown);
        };
    },[]);
    



    const {objects} = useSelector((state:StateSchema)=>state.objects);
    
    if (objects) {
        content = (
            <DetailView className={cls.detail}>
                {   defaultView && 
                    objects.map((el)=>
                        <ObjectCategoryView key={el.id}  id={el.id} adress={el.name} />)
                }
                {
                    !defaultView && 
                    <VFlexBox width={"80%"} gap={"10px"} className={cls.altViewPlate}>
                        <HFlexBox  height={"10%"} alignItems="center" align={"space-around"} className={cls.altView}>
                            <p style={{"width":"20%"}}>НАИМЕНОВАНИЕ ОБЪЕКТА</p>
                            <p style={{"width":"5%"}}>ВСЕГО СИСТЕМ</p>
                            <p style={{"width":"15%"}}>СОБЫТИЯ НА СЕГОДНЯ</p>
                            <p style={{"width":"20%","textAlign":"center"}}>(ДАТА)</p>
                        </HFlexBox>
                        {objects.map((el)=>
                            <ObjectCategoryRowView className={cls.objRow} key={el.id}  id={el.id} adress={el.name} openedID={openedID} setOpened={setOpened} />)}
                    </VFlexBox>
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