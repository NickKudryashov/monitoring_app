import cls from "./PageHeader.module.scss";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import classNames from "@/shared/lib/classNames/classNames";
import { GeneralAnswer } from "./api/api";
import { AppButon, AppButtonTheme } from "@/shared/ui/AppButton/AppButton";
import { memo } from "react";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";

interface PageHeaderProps {
    generalData: GeneralAnswer | undefined;
    poll?: () => void;
    report?: () => void;
}

export const PageHeader = memo(function _PageHeader(
    props: PageHeaderProps,
): React.ReactElement {
    const { generalData, poll = () => {}, report = () => {} } = props;
    const isMobile = useMobilDeviceDetect();
    if (isMobile) {
        return (
            <div
                className={classNames("", {}, [
                    cls.headerBox,
                    cls.headers,
                    cls.mobileHeader,
                ])}
            >
                <div className={cls.subCatNameWrapper}>
                    <p className={cls.subsystemNameField}>
                        {generalData ? generalData.subcat_name : "..."}
                    </p>
                </div>
            </div>
        );
    }
    return (
        <HFlexBox
            className={cls.headerBox}
            height={"5%"}
            align="space-between"
            alignItems="center"
            gap={"5px"}
        >
            <div className={classNames(cls.subcatNameBox, {}, [cls.headers])}>
                <div className={cls.subCatNameWrapper}>
                    <p className={cls.subsystemNameField}>
                        {generalData ? generalData.subcat_name : "..."}
                    </p>
                </div>
            </div>
            <HFlexBox
                width="27%"
                align="space-around"
                alignItems="center"
                className={cls.subcatObjectInfoTextGroup}
            >
                <p>Дата последнего обновления:</p>
                <div className={cls.dateField}>
                    <p>{generalData?.last_update}</p>
                </div>
            </HFlexBox>
            <HFlexBox
                width="20%"
                height="40%"
                align="space-around"
                alignItems="center"
            >
                <AppButon
                    onClick={poll}
                    theme={AppButtonTheme.SUBCATEGORY_BUTTON}
                    className={cls.btns}
                >
                    Опросить
                </AppButon>
                <AppButon
                    onClick={report}
                    theme={AppButtonTheme.SUBCATEGORY_BUTTON}
                    className={cls.btns}
                >
                    Отчёт
                </AppButon>
            </HFlexBox>
        </HFlexBox>
    );
});
