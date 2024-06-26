import { EntityState } from "@reduxjs/toolkit";

export interface ObjectSubCategoryType {
    id:number;
    parent:number | null;
    user_object:number;
    name:string;
    subcategory_type:string | null;
}

export interface ObjectSubCategorySchema extends EntityState<ObjectSubCategoryType> {
    isLoading:boolean;
    lastExpandedId:number | undefined;
    selectedItemToDrop:number | undefined;
}

export const SubcatTypes = {
    heat:"heat_energy_node",
    auto:"auto_node",
    electro:"electro_energy_node",
    pump:"pump_station_node"
} as const;

export type SubcatTypes = typeof SubcatTypes [keyof typeof  SubcatTypes]
