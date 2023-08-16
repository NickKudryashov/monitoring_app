import { ElectroData, TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { HeatDevice } from "entities/Heatcounters";
import { ObjectSubCategoryType } from "entities/ObjectSubCategory";
import { PumpDeviceData } from "entities/PumpDevice";

export interface SubCategoryPageSchema {
    isLoading?:boolean;
    subcats?:ObjectSubCategoryType[]
    heatcounters?:HeatDevice[]
    electrocounter?:TopLevelElectroDevice[]
    pumps?:PumpDeviceData[]
    current?:ObjectSubCategoryType
}

