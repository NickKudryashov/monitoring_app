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
import ViewChangeIcon from "shared/assets/icons/ViewChangeIcon.svg";
export interface ObjectsDetailPageProps {
 className?: string;
}

const ObjectsDetailPage = memo((props:ObjectsDetailPageProps) => {
    const { className } = props;
    const [defaultView,setDefaultView] = useState(!localStorage.getItem("view"));
    const [openedID,setOpened] = useState<number>(0);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let content;
    const onChangeViewClick = () => {
        // Handle both, `ctrl` and `meta`.
        setDefaultView((prev)=>
        {
            localStorage.setItem("view", prev ? "1" : "");

            return !prev;  
        }
        );
    };
    const openHandler = (index:number)=>{
        setOpened((prev)=>{
            if (prev===index) {
                return 0;
            }
            else {
                return index;
            }
        });
    };
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
                {   defaultView && 
                    objects.map((el)=>
                        <ObjectCategoryView last_update={el.last_update} key={el.id}  id={el.id} adress={el.address} />)
                }
                {
                    !defaultView && 
                    <VFlexBox width={"80%"} gap={"10px"} className={cls.altViewPlate}>
                        <HFlexBox  height={"10%"} alignItems="center" align={"space-around"} className={cls.altView}>
                            <p style={{"width":"10%"}}>наименовение объекта</p>
                            <p style={{"width":"20%"}}>адрес</p>
                            <p style={{"width":"7%"}}>всего систем</p>
                            <p style={{"width":"7%"}}>систем в работе</p>
                            <p style={{"width":"7%"}}>нет связи</p>
                            <p style={{"width":"7%"}}>аварии</p>
                            <p style={{"width":"7%"}}>события</p>
                            <p style={{"width":"20%","textAlign":"center"}}>время последнего опроса</p>
                        </HFlexBox>
                        {objects.map((el)=>
                            <ObjectCategoryRowView last_update={el.last_update} className={cls.objRow} key={el.id}  id={el.id} adress={el.address} openedID={openedID} setOpened={openHandler} />)}
                        
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
        <HFlexBox className={classNames(cls.ObjectsDetailPage, {}, [className])} align="flex-end">
            {content}
            <ViewChangeIcon onClick={onChangeViewClick}/>
        </HFlexBox>
    );
});
ObjectsDetailPage.displayName="ObjectsDetailPage";

export default  ObjectsDetailPage;