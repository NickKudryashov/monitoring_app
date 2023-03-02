import { useAppSelector } from "shared/hooks/hooks";

export const getObjectById = (id:number)=>{
    const {objects} = useAppSelector(state=>state.objectReducer);
    const result = objects.find(obj=>obj.id===id);
    return result;
};