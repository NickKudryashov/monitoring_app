import { CANMapper, CounterByCAN, CounterIdByCAN, DeviceRecord, ElectroCounter, TopLevelElectroDevice } from "../model/types/electroDevice";

export const createDeviceDict = (counters:ElectroCounter[])=>{
    const result:DeviceRecord = {};
    Object.keys(result);
    counters.forEach((counter)=>{
        if (result[counter.device]) {
            result[counter.device].push({...counter});
        }
        else {
            result[counter.device] = [counter,];
        }
    });
    return result;
};

export const createCanDict = (counters:ElectroCounter[])=>{
    const result:CounterIdByCAN = {};
    counters.forEach((counter)=>{
        if (result[counter.device]) {
            if(result[counter.device][counter.interface]) {
                result[counter.device][counter.interface].push(counter);
            }
            else {
                result[counter.device][counter.interface] = [counter,];
            }
        }
        else {
            result[counter.device] = {};
            result[counter.device][counter.interface] = [counter,];
        }
    });
    return result;
};