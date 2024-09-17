import { useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { DetailView } from "@/widgets/DetailView";
import cls from "./MainPage.module.scss";
import { getUserData } from "@/entities/user";
const MainPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);
    return (
        <div className={cls.MainPage}>
            <DetailView className={cls.detail}></DetailView>
        </div>
    );
};

export default MainPage;
