import classNames from "shared/lib/classNames/classNames";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./GeneralInfoBlock.module.scss";
import { HFlexBox } from "shared/ui/FlexBox/HFlexBox/HFlexBox";
import { memo } from "react";

interface GeneralInfoBlockProps {
    systems: number | undefined;
    device_type_verbose_name: string | undefined;
    device_num: number | undefined;
    address: string | undefined;
    name: string | undefined;
}

export const GeneralInfoBlock = memo(function _GeneralInfoBlock(
    props: GeneralInfoBlockProps
): React.ReactElement {
    const { systems, device_type_verbose_name, device_num, address, name } =
        props;
    return (
        <VFlexBox className={cls.generalDeviceInfoCard} gap="10px">
            <VFlexBox height={"60.5%"} width={"100%"} align="space-between">
                <p className={cls.subtitle}>Тип объекта:</p>
                <div
                    className={classNames(cls.generalCardTextWrapper, {}, [
                        cls.mainData,
                    ])}
                >
                    <p className={cls.deviceDate}>мок тип</p>
                </div>
                <p className={cls.subtitle}>абонент:</p>
                <div
                    className={classNames(cls.generalCardTextWrapper, {}, [
                        cls.mainData,
                    ])}
                >
                    <p className={cls.deviceDate}>{name ? name : ""}</p>
                </div>
                <p className={cls.subtitle}>адрес:</p>
                <div
                    className={classNames(cls.generalCardTextWrapper, {}, [
                        cls.mainData,
                    ])}
                >
                    <p className={cls.deviceDate}>{address ? address : ""}</p>
                </div>
            </VFlexBox>

            <HFlexBox
                className={cls.generalCardItems}
                height={"10.5%"}
                align="space-between"
            >
                <VFlexBox width={"43%"}>
                    <p className={cls.subtitle}>количество систем:</p>
                    <div
                        className={classNames(cls.generalCardTextWrapper, {}, [
                            cls.rowInp,
                        ])}
                    >
                        <p>{`${systems ?? "..."}`}</p>
                    </div>
                </VFlexBox>
                <VFlexBox width="54%">
                    <p className={cls.subtitle}>тип:</p>
                    <div
                        className={classNames(cls.generalCardTextWrapper, {}, [
                            cls.rowInp,
                        ])}
                    >
                        <p>{`${device_type_verbose_name ?? "..."}`}</p>
                    </div>
                </VFlexBox>
            </HFlexBox>
            <HFlexBox
                className={cls.generalCardItems}
                height={"10.5%"}
                align="space-between"
            >
                <VFlexBox width={"43%"}>
                    <p className={cls.subtitle}>информация:</p>
                    <div
                        className={classNames(cls.generalCardTextWrapper, {}, [
                            cls.rowInp,
                        ])}
                    >
                        <p>{`№${device_num ?? "..."}`}</p>
                    </div>
                </VFlexBox>
                <VFlexBox width="54%">
                    <p className={cls.subtitle}>поверка:</p>
                    <div
                        className={classNames(cls.generalCardTextWrapper, {}, [
                            cls.rowInp,
                        ])}
                    >
                        <p>поверка счетчика</p>
                    </div>
                </VFlexBox>
            </HFlexBox>
        </VFlexBox>
    );
});
