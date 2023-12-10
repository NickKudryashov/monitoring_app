import classNames from "shared/lib/classNames/classNames";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./GeneralInfoBlock.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { HeatDevice } from "entities/Heatcounters";

interface GeneralInfoBlockProps {
    deviceData:HeatDevice;
}


function GeneralInfoBlock (props:GeneralInfoBlockProps) :React.ReactElement {
    const {deviceData} = props;
    return (
        <div className={classNames(cls.generalDeviceInfoCard,{},[cls.cards,])}>
            <VFlexBox gap="10px" align="space-around" >
                <p className={cls.generalInfoTitle}>ОБОБЩЕННАЯ ИНФОРМАЦИЯ</p>
                <div className={classNames(cls.generalCardTextWrapper,{},[cls.longTextGeneralCard,])}>
                    <p className={cls.deviceDate}>дата изготовления</p>
                </div>
                <HFlexBox className={cls.generalCardItems} align="space-between">
                    <div className={cls.generalCardTextWrapper}>
                        <p>{`количество систем: ${deviceData?.systems?.length ?? "..."}`}</p>
                    </div>
                    <div className={cls.generalCardTextWrapper}>
                        <p>{`тип счетчика: ${deviceData?.device_type_verbose_name ?? "..."}`}</p>
                    </div>
                </HFlexBox>
                <HFlexBox className={cls.generalCardItems} align="space-between">
                    <div className={cls.generalCardTextWrapper}>
                        <p>{`номер счетчика: №${deviceData?.device_num ?? "..."}`}</p>
                    </div>
                    <div className={cls.generalCardTextWrapper}>
                        <p>поверка счетчика</p>
                    </div>
                </HFlexBox>
            </VFlexBox>
        </div>
    );
}

export  {GeneralInfoBlock};