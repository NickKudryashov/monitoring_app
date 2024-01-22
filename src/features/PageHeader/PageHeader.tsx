import { FC } from "react";
import cls from "./PageHeader.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import classNames from "shared/lib/classNames/classNames";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { GeneralAnswer } from "./api/api";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import { HeatPoll } from "entities/Heatcounters";

interface PageHeaderProps {
    generalData:GeneralAnswer;
    poll?:()=>void;
}


export function PageHeader (props:PageHeaderProps) :React.ReactElement {
    const {generalData,poll=()=>{}} = props;
    return (
        <HFlexBox className={cls.headerBox} height={"5%"} align="space-around" alignItems="center"  gap={"5px"}>
            <div className={classNames(cls.subcatNameBox,{},[cls.headers])}>
                <div className={cls.subCatNameWrapper}>
                    <p className={cls.subsystemNameField}>{generalData ? generalData.subcat_name : "..."}</p>
                </div>
            </div>
            <HFlexBox  width="24%"  align="space-around" alignItems="center" className={cls.subcatObjectInfoTextGroup}>
                <p>ТЕПЛОСЧЕТЧИКИ</p>
                <DropdownMenu height="40%" width="40%"/>
            </HFlexBox>
            <HFlexBox width="20%" height="40%" align="space-around" alignItems="center">
                
                <AppButon onClick={poll} theme={AppButtonTheme.SUBCATEGORY_BUTTON} className={cls.btns}>Опросить</AppButon>
                <AppButon theme={AppButtonTheme.SUBCATEGORY_BUTTON} className={cls.btns}>Отчёт</AppButon>
            </HFlexBox>
        </HFlexBox>
    );
} 