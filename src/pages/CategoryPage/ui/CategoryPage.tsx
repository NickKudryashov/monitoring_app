import { memo, useEffect } from "react";
import  classNames  from "shared/lib/classNames/classNames";
import cls from "./CategoryPage.module.scss";
import { DetailView } from "widgets/DetailView";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "shared/hooks/hooks";
import { Loader } from "shared/ui/Loader/Loader";
import { ObjectCard, objectsAllRequest } from "entities/Objects";

export interface CategoryPageProps {
 className?: string;
}

const CategoryPage = memo((props:CategoryPageProps) => {
    const { className } = props;
    const {id,s} = useParams<{s:string,id:string}>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let content;
    // if (!id) {
    //     navigate(RoutePathAuth.main);
    // }
    useEffect(()=>{
        dispatch(objectsAllRequest())
    },[id])
    
    const {categories} = useSelector((state:StateSchema)=>state.category);
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    // const catItem = getCategoryByID(categories,Number(id),);
    
    if (objects) {
        content = (
            <DetailView className={cls.detail}>
                {
                    objects.map((el)=>
                    <ObjectCard key={el.id} name={el.name} />)
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
        <div className={classNames(cls.categoryPage, {}, [className])}>
            {/* <MainLayout
                DetailView={content}
                deviceList={<DeviceList />}
                navbar={<Navbar/>}
                footer={<Footer/>}
            /> */}
            {content}
        </div>
    );
});
CategoryPage.displayName="categoryPage";

export default  CategoryPage;