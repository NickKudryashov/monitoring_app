import { memo, ReactElement } from "react";
import HeatIcon from "shared/assets/icons/SystemHeatNodeIcon.svg";
import ElectroIcon from "shared/assets/icons/SystemElectroNodeIcon.svg";
import PumpIcon from "shared/assets/icons/SystemPumpNodeIcon.svg";
import AutoIcon from "shared/assets/icons/SystemAutomaticNodeIcon.svg";
import cls from "./SubcatIcon.module.scss";
import { SubcatTypes } from "entities/ObjectSubCategory/model/types/ObjectSubCategorySchema";
export const SubcatIcon = memo(
    (props: { subcategory_type: SubcatTypes }): ReactElement => {
        const { subcategory_type } = props;
        return (
            <>
                {subcategory_type === "heat_energy_node" && (
                    <HeatIcon className={cls.icon} />
                )}
                {subcategory_type === "pump_station_node" && (
                    <PumpIcon className={cls.icon} />
                )}
                {subcategory_type === "electro_energy_node" && (
                    <ElectroIcon className={cls.icon} />
                )}
                {subcategory_type === "auto_node" && (
                    <AutoIcon className={cls.icon} />
                )}
            </>
        );
    }
);
