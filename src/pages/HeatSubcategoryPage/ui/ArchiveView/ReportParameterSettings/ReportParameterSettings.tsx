import { ReactElement } from "react";
import { AppInput } from "@/shared/ui/AppInput/AppInput";
import { HFlexBox } from "@/shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "@/shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ReportParameterSettings.module.scss";
const MOCK_ROWS = [1,2,3,4];
function ReportParameterSettings():ReactElement {
    return (
        <VFlexBox width="95%" height="30%">
            <p>Настройка параметров:</p>
            <VFlexBox height="90%" gap="5px" className={cls.ReportParameterSettings}>
                {MOCK_ROWS.map((el)=>
                    <HFlexBox height="20%" className={cls.row} alignItems="center" align="space-around" key={el}>
                        <AppInput type="checkbox"/>
                        <AppInput placeholder="Ключ:" className={cls.input}/>
                        <AppInput placeholder="Значение" className={cls.input}/>
                    </HFlexBox>
                )}
            </VFlexBox>
        </VFlexBox>
    );
}


export {ReportParameterSettings};