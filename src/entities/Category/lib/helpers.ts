import { useAppSelector } from "shared/hooks/hooks";
import { CategoryItem } from "../reducers/categoryReducers";

export const getCategoryByID = (categories:CategoryItem[],id:number):CategoryItem=>{
    const result = categories.find((cat)=>cat.id===id);
    return result;
};

export const findChildrens = (categories:CategoryItem[],id:number):number[]=>{
    const toDelete:number[] = [id,];
    let childs:number[] = [];
    const flag = true;
    categories.map((cat)=>{
        if (cat.parentID===id){
            childs.push(cat.id);
            toDelete.push(cat.id);
        }
    });
    while (flag) {
        categories.map((cat)=>{
            if (childs.includes(cat.parentID)){
                childs.push(cat.id);
                toDelete.push(cat.id);
            }
        });
        if (childs.length===0) {
            break;
        }
        childs=[];
        
    }
    return toDelete;
};