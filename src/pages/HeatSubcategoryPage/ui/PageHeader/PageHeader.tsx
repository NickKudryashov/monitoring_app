import { FC } from "react";
import cls from "./PageHeader.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import classNames from "shared/lib/classNames/classNames";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import { GeneralAnswer } from "pages/HeatSubcategoryPage/api/api";

interface PageHeaderProps {
    generalData:GeneralAnswer;
}


export function PageHeader (props:PageHeaderProps) :React.ReactElement {
    const {generalData} = props;
    return (
        <HFlexBox className={cls.headerBox}   gap={"5px"}>
            <div className={classNames(cls.subcatNameBox,{},[cls.headers])}>
                <div className={cls.subCatNameWrapper}>
                    <p className={cls.subsystemNameField}>{generalData ? generalData.subcat_name : "..."}</p>
                </div>
            </div>
            <div className={classNames(cls.subcatObjectInfo,{},[cls.headers])}>
                <HFlexBox className={cls.objectInfoContainer} gap="10px">
                    <VFlexBox  width="35%" align="space-around" className={cls.subcatObjectInfoTextGroup}>
                        <p>ОБЪЕКТ</p>
                        <div className={cls.subCatObjInfoWrapper}>
                            <p className={cls.objectInfoTextField}>{generalData ? generalData.user_object_name : "..."}</p>
                        </div>

                    </VFlexBox>
                    <VFlexBox width="60%" align="space-around" className={cls.subcatObjectInfoTextGroup}>
                        <p>АДРЕС</p>
                        <div className={cls.subCatObjInfoWrapper}>
                            <p className={cls.objectInfoTextField}>{generalData ? generalData.adress : "..."}</p>
                        </div>
                    </VFlexBox>
                </HFlexBox>
            </div>
        </HFlexBox>
    );
} 