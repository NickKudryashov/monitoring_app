import { useAppSelector } from "shared/hooks/hooks";
import { CategoryItem } from "../reducers/categoryReducers";

export const getCategoryByID = (id:number):CategoryItem=>{
    const {categories} = useAppSelector(state=>state.categoryReducer);
    const result = categories.find((cat)=>cat.id===id);
    return result;
};