import classNames from "shared/lib/classNames/classNames";
import cls from "./ObjectCategoryRowView.module.scss";

import { PropsWithChildren, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlusIcon from "shared/assets/icons/plusSystemIcon.svg";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { useAppDispatch } from "shared/hooks/hooks";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { subcatCardSliceActions } from "features/ObjectCategoryCardView/model/cardSlice";
import {
    SubcatIcon,
    SubcategoryAnswer,
    SubcategoryStatus,
    editSubcatOrder,
    getObjectSubcategoryData,
} from "entities/ObjectSubCategory";
import { ROUTE_MAPPER } from "shared/lib/helpers/subcategoryTypeMapper";
interface ObjectCategoryRowViewProps {
    className?: string;
    openedID: number;
    setOpened: (id: number) => void;
    adress: string;
    abonent: string;
    last_update: string;
    id: number;
}
export function ObjectCategoryRowView(
    props: PropsWithChildren<ObjectCategoryRowViewProps>
) {
    const { className, id, adress, openedID, setOpened, last_update, abonent } =
        props;
    const { data, isLoading, refetch } = getObjectSubcategoryData(id);

    useEffect(() => {
        refetch();
    }, []);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedItem } = useSelector(
        (state: StateSchema) => state.subcatCards
    );
    const [editOrder, { isLoading: isUpdating }] = editSubcatOrder();
    const onSubcatClick = (el: SubcategoryAnswer) => {
        navigate(ROUTE_MAPPER[el.subcategory_type] + el.id);
    };

    const calculateMods = useCallback(
        (index: number) => ({
            [cls.greymarker]:
                data?.data[index].status === SubcategoryStatus.no_answer,
            [cls.greenmarker]:
                data?.data[index].status === SubcategoryStatus.success,
        }),
        [data]
    );
    const dragStartHandler = (
        e: React.DragEvent<HTMLDivElement>,
        el: SubcategoryAnswer
    ) => {
        // console.log("старт на ",el.name,el.user_object);
        dispatch(subcatCardSliceActions.setItem(el));
    };

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {};
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {};
    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const dropHandler = (
        e: React.DragEvent<HTMLDivElement>,
        el: SubcategoryAnswer
    ) => {
        e.preventDefault();
        const success =
            selectedItem && el.user_object === selectedItem.user_object;
        if (success) {
            editOrder({ id: selectedItem.id, order_index: el.order_index });
            editOrder({ id: el.id, order_index: selectedItem.order_index });
        }
        dispatch(subcatCardSliceActions.removeItem());
    };

    return (
        <VFlexBox
            height={openedID === id ? `${data.count * 6 + 12}%` : "6%"}
            gap="10px"
            className={classNames(cls.catRow, {}, [className])}
        >
            <HFlexBox
                align="space-around"
                alignItems="center"
                height={openedID === id ? `${100 / (data.count + 2)}%` : "100%"}
                onClick={() => setOpened(id)}
                className={cls.rowHeader}
            >
                <u className={cls.headerField}>{abonent}</u>
                <p className={cls.adressField}>{adress}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.countField}>{data?.count}</p>
                <p className={cls.timestampField} />
            </HFlexBox>
            {id === openedID && (
                <VFlexBox
                    height={`${(100 / (data.count + 2)) * (data.count + 1)}%`}
                    gap="10px"
                    alignItems="center"
                    className={classNames(cls.rows, {}, [])}
                >
                    {data &&
                        data.data.map((el, i) => (
                            <HFlexBox
                                onClick={() => onSubcatClick(el)}
                                height={`${100 / (data.count + 1)}%`}
                                key={el.id}
                                align="space-around"
                                alignItems="center"
                                className={classNames("", calculateMods(i), [
                                    cls.row,
                                ])}
                                draggable={true}
                                onDragStart={(e) => dragStartHandler(e, el)}
                                onDragLeave={dragLeaveHandler}
                                onDragEnd={dragEndHandler}
                                onDragOver={dragOverHandler}
                                onDrop={(e) => dropHandler(e, el)}
                            >
                                <HFlexBox
                                    align="space-between"
                                    alignItems="center"
                                    width="20%"
                                >
                                    <SubcatIcon
                                        subcategory_type={el.subcategory_type}
                                    />
                                    <p className={cls.nameField}>{el.name}</p>
                                </HFlexBox>

                                <p className={cls.eventField}>мок событие</p>
                                <p className={cls.datetimeField}>
                                    {el.last_update}
                                </p>
                            </HFlexBox>
                        ))}
                    <HFlexBox
                        gap="10px"
                        alignItems="center"
                        height={`${100 / (data.count + 1)}%`}
                        className={classNames(cls.addingRow, {}, [cls.row])}
                    >
                        <PlusIcon className={cls.addIcon} />
                        <p>Добавить систему</p>
                    </HFlexBox>
                    <p>{last_update}</p>
                </VFlexBox>
            )}
        </VFlexBox>
    );
}
