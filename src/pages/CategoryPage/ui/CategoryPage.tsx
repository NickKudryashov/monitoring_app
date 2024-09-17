import { memo, useEffect } from "react";
import classNames from "@/shared/lib/classNames/classNames";
import cls from "./CategoryPage.module.scss";
import { DetailView } from "@/widgets/DetailView";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { Loader } from "@/shared/ui/Loader/Loader";
import { ObjectCard, objectsAllRequest } from "@/entities/Objects";
import { RoutePathAuth } from "@/shared/config/RouteConfig/RouteConfig";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";

export interface CategoryPageProps {
    className?: string;
}

const CategoryPage = memo((props: CategoryPageProps) => {
    const { className = "" } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let content;
    useEffect(() => {
        dispatch(objectsAllRequest());
    }, []);

    const { objects } = useSelector((state: StateSchema) => state.objects);

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
