import { ReactElement } from "react";
import { AppInput } from "shared/ui/AppInput/AppInput";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./Colontitul.module.scss";
const MOCK_ROWS = [1,2,3,4];
function Colontitul():ReactElement {
    return (
        <VFlexBox width="48%">
            <p>КОЛОНТИТУЛ:</p>
            <VFlexBox gap="5px" className={cls.Colontitul}>
                {MOCK_ROWS.map((el)=>
                    <HFlexBox align="space-around" key={el}>
                        <AppInput type="checkbox"/>
                        <AppInput placeholder="" className={cls.input}/>
                        <AppInput placeholder="" className={cls.input}/>
                    </HFlexBox>
                )}
            </VFlexBox>
        </VFlexBox>
    );
}


export {Colontitul};