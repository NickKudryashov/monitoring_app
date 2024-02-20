import cls from "./PageHeader.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import classNames from "shared/lib/classNames/classNames";
import { GeneralAnswer } from "./api/api";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";

interface PageHeaderProps {
    generalData:GeneralAnswer;
    poll?:()=>void;
    report?:()=>void;
}


export function PageHeader (props:PageHeaderProps) :React.ReactElement {
    const {generalData,poll=()=>{},report=()=>{}} = props;
    return (
        <HFlexBox className={cls.headerBox} height={"5%"} align="space-between" alignItems="center"  gap={"5px"}>
            <div className={classNames(cls.subcatNameBox,{},[cls.headers])}>
                <div className={cls.subCatNameWrapper}>
                    <p className={cls.subsystemNameField}>{generalData ? generalData.subcat_name : "..."}</p>
                </div>
            </div>
            <HFlexBox  width="24%"  align="space-around" alignItems="center" className={cls.subcatObjectInfoTextGroup}>
                <p>Дата последнего обновления:</p>
                <div className={cls.dateField}>
                    <p>11.11.11</p>
                </div>
            </HFlexBox>
            <HFlexBox width="20%" height="40%" align="space-around" alignItems="center">
                
                <AppButon onClick={poll} theme={AppButtonTheme.SUBCATEGORY_BUTTON} className={cls.btns}>Опросить</AppButon>
                <AppButon onClick={report} theme={AppButtonTheme.SUBCATEGORY_BUTTON} className={cls.btns}>Отчёт</AppButon>
            </HFlexBox>
        </HFlexBox>
    );
} 