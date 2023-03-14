import { HeatDevice } from "../types/type";

export const getDeviceById=(devices:HeatDevice[],id:number)=>(devices.reduce((dev)=>{
    if (dev.id===id){
        return dev;}
}));