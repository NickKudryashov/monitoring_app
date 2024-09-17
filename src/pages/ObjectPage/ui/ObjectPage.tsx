import { memo, useEffect, useMemo } from "react";
import cls from "./ObjectPage.module.scss";

import type { PropsWithChildren } from "react";
import { ObjectDetail } from "@/entities/Objects";
import { DetailView } from "@/widgets/DetailView";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { TelegramChat } from "@/entities/TelegramChat/model/types/ChatSchema";
import { Chat, getTelegramChats } from "@/entities/TelegramChat";
import { SubcategoryCard } from "@/entities/ObjectSubCategory";
import { RoutePathAuth } from "@/shared/config/RouteConfig/RouteConfig";

interface ObjectPageProps {
    className?: string;
}
const ObjectPage = memo((props: PropsWithChildren<ObjectPageProps>) => {
    const { className } = props;
    const { objects } = useSelector((state: StateSchema) => state.objects);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const selectedObj = objects.filter((obj) => obj.id === Number(id))[0];
    const chats = useSelector(getTelegramChats);
    const { entities } = useSelector((state: StateSchema) => state.objSubCat);
    const currentChat = useMemo(() => {
        const chatQuery = chats.filter((el) => el.objects.includes(Number(id)));
        if (chatQuery.length) {
            return chatQuery[0];
        }
    }, [chats, id]);

    const dispatch = useAppDispatch();
    useEffect(() => {}, [dispatch, id]);
    const content = (
        <DetailView className={cls.detail}>
            <ObjectDetail className={cls.obj} obj={selectedObj}>
                <div className={cls.chatWithBtns}>
                    <div className={cls.subcats}>
                        {entities &&
                            Object.values(entities).map(
                                (el) =>
                                    el &&
                                    el.user_object === Number(id) &&
                                    el.parent === null && (
                                        <SubcategoryCard
                                            onClick={() => {
                                                navigate(
                                                    RoutePathAuth.subcat + el.id
                                                );
                                                localStorage.setItem(
                                                    "subcategory_" + el.id,
                                                    "1"
                                                );
                                            }}
                                            key={el.id}
                                            catID={el.id}
                                        />
                                    )
                            )}
                    </div>
                    {currentChat && <Chat obj_id={Number(id)} />}
                </div>
            </ObjectDetail>
        </DetailView>
    );

    return <div className={cls.ObjectPage}>{content}</div>;
});
ObjectPage.displayName = "objectPage";
export default ObjectPage;
