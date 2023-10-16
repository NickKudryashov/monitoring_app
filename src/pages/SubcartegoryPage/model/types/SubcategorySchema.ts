import { ElectroData, TopLevelElectroDevice } from "entities/ElectroDevice/model/types/electroDevice";
import { HeatDevice } from "entities/Heatcounters";
import { ObjectSubCategoryType } from "entities/ObjectSubCategory";
import { PumpDeviceData } from "entities/PumpDevice";

export interface SubCategoryPageSchema {
    isLoading?:boolean;
    subcats?:ObjectSubCategoryType[];
    heatcounters?:number[];
    electrocounter?:number[];
    pumps?:number[];
    autos?:number[];
    current?:ObjectSubCategoryType;
}

