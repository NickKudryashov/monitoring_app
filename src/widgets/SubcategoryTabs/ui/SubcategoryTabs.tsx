import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./SubcategoryTabs.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { ReactElement, ReactNode, memo, useEffect } from "react";
import { useAppDispatch } from "shared/hooks/hooks";
import { SubcategoryTabsList, TabContentLength } from "../types/type";
import { tabSliceActions } from "../model/slice/slice";
import { useSelector } from "react-redux";
import {
    getSubTab,
    getTab,
    getTabContentLength,
} from "../model/selectors/selectors";

interface TabContent {
    [key: number]: ReactElement[];
}

interface SubcategoryTabsProps {
    className?: string;
    content: TabContent;
    children?: ReactNode;
}
const TAB_NAMES = [
    "ОБОБЩЕННАЯ ИНФОРМАЦИЯ",
    "СОБЫТИЯ",
    "ПАРАМЕТРЫ",
    "АРХИВЫ",
    "ГРАФИКИ",
    "МНЕМОСХЕМА",
];
export const SubcategoryTabs: React.FC<SubcategoryTabsProps> = memo(
    (props: SubcategoryTabsProps) => {
        const { className = "", content, children } = props;
        const dispatch = useAppDispatch();
        const tab = useSelector(getTab);
        const subTab = useSelector(getSubTab);
        const tabContentLength = useSelector(getTabContentLength);
        useEffect(() => {
            const result: TabContentLength = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            };
            Object.keys(content).forEach((key) => {
                result[Number(key) as SubcategoryTabsList] =
                    content[Number(key)].length;
            });
            dispatch(tabSliceActions.setContentLength(result));
        }, [content, dispatch]);
        useEffect(() => {
            return () => {
                dispatch(tabSliceActions.setDefaultTab());
            };
        }, []);
        return (
            <VFlexBox
                className={classNames(cls.SubcatTabs, {}, [className])}
                align="flex-start"
                alignItems="center"
                width="23%"
            >
                {TAB_NAMES.map((el, i) => (
                    <>
                        <AppButon
                            className={classNames(
                                cls.btns,
                                {
                                    [cls.selectedBtn]: tab === i,
                                    [cls.disabled]: !content[i]?.length,
                                },
                                []
                            )}
                            width={"100%"}
                            onClick={() =>
                                dispatch(
                                    tabSliceActions.setTab(
                                        i as SubcategoryTabsList
                                    )
                                )
                            }
                            theme={AppButtonTheme.SUBCATEGORY_BUTTON}
                        >
                            {el}
                        </AppButon>
                        {tab === i && (
                            <VFlexBox gap="10px" className={cls.paramTitleBox}>
                                {content[tab]?.map((el, i) => (
                                    <div
                                        key={i}
                                        className={classNames(
                                            "",
                                            {
                                                [cls.selectedSubTab]:
                                                    tab !== 0 && subTab === i,
                                            },
                                            []
                                        )}
                                        onClick={() => {
                                            dispatch(
                                                tabSliceActions.setSubTab(i)
                                            );
                                        }}
                                    >
                                        {el}
                                    </div>
                                ))}
                            </VFlexBox>
                        )}
                    </>
                ))}
            </VFlexBox>
        );
    }
);
