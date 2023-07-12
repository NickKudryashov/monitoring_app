import { memo } from "react";
import  classNames  from "shared/lib/classNames/classNames";
import cls from "./CategoryPage.module.scss";
import { Navbar } from "widgets/Navbar";
import { DeviceList } from "widgets/DeviceList";
import { DetailView } from "widgets/DetailView";
import { useNavigate, useParams } from "react-router-dom";
import { categorySlice, getCategoryByID } from "entities/Category";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { useAppDispatch } from "shared/hooks/hooks";
import { Loader } from "shared/ui/Loader/Loader";
import { Footer } from "shared/ui/Footer/Footer";

export interface CategoryPageProps {
 className?: string;
}

const CategoryPage = memo((props:CategoryPageProps) => {
    const { className } = props;
    const {id,s} = useParams<{s:string,id:string}>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let content;
    if (!id) {
        navigate(RoutePathAuth.main);
    }
    const {categories} = useSelector((state:StateSchema)=>state.category);
    const catItem = getCategoryByID(categories,Number(id),);
    
    if (categories && catItem) {
        content = (
            <DetailView className={cls.detail}>
                <ObjectCategoryView category={catItem}/>
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
            <MainLayout
                DetailView={content}
                deviceList={<DeviceList />}
                navbar={<Navbar/>}
                footer={<Footer/>}
            />
        </div>
    );
});
CategoryPage.displayName="categoryPage";

export default  CategoryPage;