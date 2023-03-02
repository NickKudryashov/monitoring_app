import { useAppSelector } from "shared/hooks/hooks";
import { CategoryItem } from "../reducers/categoryReducers";

export const getCategoryByID = (categories:CategoryItem[],id:number):CategoryItem=>{
    const result = categories.find((cat)=>cat.id===id);
    return result;
};