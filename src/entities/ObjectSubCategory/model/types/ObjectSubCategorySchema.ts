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