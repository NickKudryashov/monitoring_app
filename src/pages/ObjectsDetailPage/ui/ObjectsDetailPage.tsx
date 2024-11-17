import { memo, useCallback, useMemo, useState } from "react";
import classNames from "@/shared/lib/classNames/classNames";
import cls from "./ObjectsDetailPage.module.scss";
import { DetailView } from "@/widgets/DetailView";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { Loader } from "@/shared/ui/Loader/Loader";
import { getAllObjects } from "@/entities/Objects";
import {
    ObjectCategoryRowView,
    ObjectCategoryView,
} from "@/features/ObjectCategoryCardView";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import FilterIcon from "@/shared/assets/icons/FilterIcon.svg";
import { getNavbarSearchValue } from "@/widgets/Navbar";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
export interface ObjectsDetailPageProps {
    className?: string;
}

const ObjectsDetailPage = memo((props: ObjectsDetailPageProps) => {
    const { className = "" } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const [defaultView, setDefaultView] = useState(
        !localStorage.getItem("view"),
    );
    const showAll = useMemo(() => {
        const showAllParam = searchParams.get("showAll");
        if (showAllParam) {
            return { ...searchParams, showAll: showAllParam };
        }
        return { ...searchParams, showAll: undefined };
    }, [searchParams]);
    const { data: objects } = getAllObjects(showAll);
    const [openedID, setOpened] = useState<number>(0);
    const searchVal = useSelector(getNavbarSearchValue);
    const isMobile = useMobilDeviceDetect();
    let content;
    const onChangeViewClick = () => {
        // Handle both, `ctrl` and `meta`.
        setDefaultView((prev) => {
            localStorage.setItem("view", prev ? "1" : "");

            return !prev;
        });
    };
    const openHandler = (index: number) => {
        setOpened((prev) => {
            if (prev === index) {
                return 0;
            } else {
                return index;
            }
        });
    };

    const showAllFitlerHandler = useCallback(() => {
        setSearchParams((prev) => ({
            ...prev,
            showAll: "1",
        }));
    }, []);
    const showAllClearFitlerHandler = useCallback(() => {
        setSearchParams({});
    }, []);

    if (objects) {
        content = (
            <DetailView className={cls.detail}>
                {!isMobile && <HFlexBox height="2%" width="35%"></HFlexBox>}
                <HFlexBox
                    height={isMobile ? "1%" : "2%"}
                    className={cls.filters}
                    alignItems="center"
                    gap="3px"
                    align={isMobile ? "flex-end" : "space-between"}
                    width={isMobile ? "100%" : "51%"}
                >
                    {
                        <HFlexBox
                            width="100%"
                            align={isMobile ? "space-between" : "flex-end"}
                        >
                            <HFlexBox
                                onClick={showAllClearFitlerHandler}
                                width="25%"
                                alignItems="center"
                            >
                                <p>Очистить фильтры</p>
                            </HFlexBox>
                            <HFlexBox
                                onClick={() =>
                                    setSearchParams((prev) => ({
                                        ...prev,
                                        no_answer: "1",
                                    }))
                                }
                                gap="3px"
                                width="15%"
                                alignItems="center"
                                className={classNames(
                                    "",
                                    {
                                        [cls.selectedFilter]:
                                            !!searchParams.get("no_answer"),
                                    },
                                    [],
                                )}
                            >
                                <p>Нет связи</p>
                                <FilterIcon />
                            </HFlexBox>
                            <HFlexBox gap="3px" width="13%" alignItems="center">
                                <p>Аварии</p>
                                <FilterIcon />
                            </HFlexBox>
                            <HFlexBox
                                onClick={() =>
                                    setSearchParams((prev) => ({
                                        ...prev,
                                        events: "1",
                                    }))
                                }
                                gap="3px"
                                width="15%"
                                alignItems="center"
                                className={classNames(
                                    "",
                                    {
                                        [cls.selectedFilter]:
                                            !!searchParams.get("events"),
                                    },
                                    [],
                                )}
                            >
                                <p>События</p>
                                <FilterIcon />
                            </HFlexBox>
                            <HFlexBox
                                onClick={showAllFitlerHandler}
                                gap="3px"
                                width="15%"
                                alignItems="center"
                            >
                                <p>Показать всё</p>
                            </HFlexBox>
                            {!isMobile && (
                                <HFlexBox width="15%" alignItems="center">
                                    <p onClick={onChangeViewClick}>
                                        Переключить вид
                                    </p>
                                </HFlexBox>
                            )}
                        </HFlexBox>
                    }
                </HFlexBox>
                {defaultView &&
                    objects.map(
                        (el) =>
                            (!searchVal ||
                                el.address.toLowerCase().includes(searchVal) ||
                                el.abonent
                                    .toLocaleLowerCase()
                                    .includes(searchVal)) && (
                                <ObjectCategoryView
                                    searchParams={searchParams}
                                    visible={el.visible}
                                    abonent={el.abonent}
                                    last_update={el.last_update}
                                    key={el.id}
                                    id={el.id}
                                    adress={el.address}
                                />
                            ),
                    )}
                {!defaultView && (
                    <VFlexBox
                        width={"80%"}
                        gap={"10px"}
                        className={cls.altViewPlate}
                    >
                        <HFlexBox
                            height={"10%"}
                            alignItems="center"
                            align={"space-around"}
                            className={cls.altView}
                        >
                            <p style={{ width: "10%" }}>наименовение объекта</p>
                            <p style={{ width: "20%" }}>адрес</p>
                            <p style={{ width: "7%" }}>всего систем</p>
                            <p style={{ width: "7%" }}>систем в работе</p>
                            <p style={{ width: "7%" }}>нет связи</p>
                            <p style={{ width: "7%" }}>аварии</p>
                            <p style={{ width: "7%" }}>события</p>
                            <p
                                style={{
                                    width: "20%",
                                    textAlign: "center",
                                }}
                            >
                                время последнего опроса
                            </p>
                        </HFlexBox>
                        {objects.map(
                            (el) =>
                                (!searchVal ||
                                    el.address
                                        .toLowerCase()
                                        .includes(searchVal) ||
                                    el.abonent
                                        .toLocaleLowerCase()
                                        .includes(searchVal)) && (
                                    <ObjectCategoryRowView
                                        searchParams={searchParams}
                                        last_update={el.last_update}
                                        className={cls.objRow}
                                        key={el.id}
                                        id={el.id}
                                        adress={el.address}
                                        abonent={el.abonent}
                                        openedID={openedID}
                                        setOpened={openHandler}
                                    />
                                ),
                        )}
                    </VFlexBox>
                )}
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
        <HFlexBox
            className={classNames(cls.ObjectsDetailPage, {}, [className])}
            align="center"
            data-testid="ObjSubcatPage"
        >
            {content}
        </HFlexBox>
    );
});
ObjectsDetailPage.displayName = "ObjectsDetailPage";

export default ObjectsDetailPage;
