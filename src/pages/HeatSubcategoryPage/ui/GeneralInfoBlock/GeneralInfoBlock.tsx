import classNames from "shared/lib/classNames/classNames";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./GeneralInfoBlock.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { HeatDevice } from "entities/Heatcounters";
import { PumpDeviceData } from "entities/PumpDevice";

interface GeneralInfoBlockProps {
    systems:number;
    device_type_verbose_name:string;
    device_num:number;
    address:string;
    name:string;
}


function GeneralInfoBlock (props:GeneralInfoBlockProps) :React.ReactElement {
    const {systems,device_type_verbose_name,device_num,address,name} = props;
    return (
        <VFlexBox className={cls.generalDeviceInfoCard} gap="10px"  >
            <VFlexBox height={"25%"} width={"100%"} align="space-between">
                <p className={cls.subtitle}>адрес:</p>
                <div className={classNames(cls.generalCardTextWrapper,{},[cls.mainData])}>
                    <p className={cls.deviceDate}>{address?address:"Моковые данные"}</p>
                </div>
                <p className={cls.subtitle}>объект:</p>

                <div className={classNames(cls.generalCardTextWrapper,{},[cls.mainData])}>
                    <p className={cls.deviceDate}>{name?name:""}</p>
                </div>
                <p className={cls.subtitle}>изготовление:</p>
                <div className={classNames(cls.generalCardTextWrapper,{},[cls.mainData])}>
                    <p className={cls.deviceDate}>дата изготовления</p>
                </div>
            </VFlexBox>
            
            <HFlexBox className={cls.generalCardItems} height={"8.3%"}  align="space-around">
                <VFlexBox>
                    <p className={cls.subtitle}>количество систем:</p>
                    <div className={classNames(cls.generalCardTextWrapper,{},[cls.rowInp])}>
                        <p>{
                            `${systems ?? "..."}`}</p>
                    </div>
                </VFlexBox>
                <VFlexBox>
                    <p className={cls.subtitle}>тип:</p>
                    <div className={classNames(cls.generalCardTextWrapper,{},[cls.rowInp])}>
                        <p>{`${device_type_verbose_name ?? "..."}`}</p>
                    </div>
                </VFlexBox>
                
            </HFlexBox>
            <HFlexBox className={cls.generalCardItems} height={"8.3%"}  align="space-around">
                <VFlexBox>
                    <p className={cls.subtitle}>информация:</p>
                    <div className={classNames(cls.generalCardTextWrapper,{},[cls.rowInp])}>
                        <p>{`№${device_num ?? "..."}`}</p>
                    </div>
                </VFlexBox>
                <VFlexBox>
                    <p className={cls.subtitle}>поверка:</p>
                    <div className={classNames(cls.generalCardTextWrapper,{},[cls.rowInp])}>
                        <p>поверка счетчика</p>
                    </div>
                </VFlexBox>
                
            </HFlexBox>
        </VFlexBox>
    );
}

export  {GeneralInfoBlock};