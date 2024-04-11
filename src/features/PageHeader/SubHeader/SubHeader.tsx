import cls from "./SubHeader.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import classNames from "shared/lib/classNames/classNames";
import { AppButon, AppButtonTheme } from "shared/ui/AppButton/AppButton";
import { DropdownMenu } from "shared/ui/DropdownMenu/DropdownMenu";
import { GeneralAnswer } from "../api/api";
import { AppInput, InputThemes } from "shared/ui/AppInput/AppInput";

interface SubHeaderProps {
    generalData:GeneralAnswer;
}


export function SubHeader (props:SubHeaderProps) :React.ReactElement {
    const {generalData} = props;
    return (
        <HFlexBox className={cls.headerBox} height={"10%"} align="space-between" alignItems="center"  gap={"5px"}>
            <AppInput width={"45%"} disabled theme={InputThemes.CLEAR} className={cls.input} value={generalData?.abonent} />
            <AppInput width={"45%"} disabled theme={InputThemes.CLEAR} className={cls.input} value={generalData?.adress} />
        </HFlexBox>
    );
} 