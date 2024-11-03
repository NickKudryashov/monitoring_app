import { memo } from "react";
import classNames from "@/shared/lib/classNames/classNames";
import cls from "./CategoryPage.module.scss";
import { DetailView } from "@/widgets/DetailView";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/shared/ui/Loader/Loader";
import { getAllObjects, ObjectCard } from "@/entities/Objects";
import { RoutePathAuth } from "@/shared/config/RouteConfig/RouteConfig";

export interface CategoryPageProps {
    className?: string;
}

const CategoryPage = memo((props: CategoryPageProps) => {
    const { className = "" } = props;
    const navigate = useNavigate();
    let content;

    const { data: objects } = getAllObjects({});

    if (objects) {
        content = (
            <DetailView className={cls.detail}>
                {objects.map((el) => (
                    <ObjectCard
                        key={el.id}
                        name={el.name}
                        address={el.address}
                        lastUpdate={el.last_update}
                        onClick={() => navigate(RoutePathAuth.object + el.id)}
                    />
                ))}
            </DetailView>
        );
    } else {
        content = (
            <DetailView className={cls.detail}>
                <Loader />
            </DetailView>
        );
    }

    return (
        <div className={classNames(cls.categoryPage, {}, [className])}>
            {content}
        </div>
    );
});
CategoryPage.displayName = "categoryPage";

export default CategoryPage;
