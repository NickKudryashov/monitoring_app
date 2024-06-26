import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./SubcategoryTabs.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { GeneralInfoBlock } from "features/SubcategoryGeneralInfo/ui/GeneralInfoBlock";
import { ReactElement, ReactNode } from "react";

interface TabContent {
    [key: number]: ReactElement;
}

interface SubcategoryTabsProps {
    className?: string;
    selectedTab: number;
    setSelectedTab: (index: number) => void;
    content: TabContent;
    children?: ReactNode;
}

export const SubcategoryTabs: React.FC<SubcategoryTabsProps> = (
    props: SubcategoryTabsProps
) => {
    const { setSelectedTab, className, selectedTab, content, children } = props;
    return (
        <VFlexBox
            className={classNames(cls.SubcatTabs, {}, [className])}
            align="flex-start"
            alignItems="center"
            width="23%"
        >
            <AppButon
                className={classNames(
                    cls.btns,
                    { [cls.selectedBtn]: selectedTab === 0 },
                    []
                )}
                width={"100%"}
                onClick={() => setSelectedTab(0)}
                theme={AppButtonTheme.SUBCATEGORY_BUTTON}
            >
                ОБОБЩЕННАЯ ИНФОРМАЦИЯ
            </AppButon>
            {selectedTab === 0 && content[selectedTab]}
            <AppButon
                className={classNames(
                    cls.btns,
                    { [cls.selectedBtn]: selectedTab === 1 },
                    []
                )}
                width={"100%"}
                onClick={() => setSelectedTab(1)}
                theme={AppButtonTheme.SUBCATEGORY_BUTTON}
            >
                СОБЫТИЯ
            </AppButon>
            {selectedTab === 1 && content[selectedTab]}
            <AppButon
                className={classNames(
                    cls.btns,
                    { [cls.selectedBtn]: selectedTab === 2 },
                    []
                )}
                width={"100%"}
                onClick={() => {
                    setSelectedTab(2);
                }}
                theme={AppButtonTheme.SUBCATEGORY_BUTTON}
            >
                ПАРАМЕТРЫ
            </AppButon>
            {selectedTab === 2 && content[selectedTab]}
            <AppButon
                className={classNames(
                    cls.btns,
                    { [cls.selectedBtn]: selectedTab === 3 },
                    []
                )}
                width={"100%"}
                onClick={() => setSelectedTab(3)}
                theme={AppButtonTheme.SUBCATEGORY_BUTTON}
            >
                АРХИВЫ
            </AppButon>
            {selectedTab === 3 && content[selectedTab]}
            <AppButon
                className={classNames(
                    cls.btns,
                    { [cls.selectedBtn]: selectedTab === 4 },
                    []
                )}
                width={"100%"}
                onClick={() => setSelectedTab(4)}
                theme={AppButtonTheme.SUBCATEGORY_BUTTON}
            >
                ГРАФИКИ
            </AppButon>
            {selectedTab === 4 && <VFlexBox className={cls.mockcontent} />}
            <AppButon
                className={classNames(
                    cls.btns,
                    { [cls.selectedBtn]: selectedTab === 5 },
                    []
                )}
                width={"100%"}
                onClick={() => setSelectedTab(5)}
                theme={AppButtonTheme.SUBCATEGORY_BUTTON}
            >
                МНЕМОСХЕМА
            </AppButon>
            {selectedTab === 5 && <VFlexBox className={cls.mockcontent} />}
        </VFlexBox>
    );
};
