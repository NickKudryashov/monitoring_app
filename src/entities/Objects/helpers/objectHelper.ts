import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { useSelector } from "react-redux";

export const getObjectById = (id:number)=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {objects} = useSelector((state:StateSchema)=>state.objects);
    const result = objects.find(obj=>obj.id===id);
    return result;
};