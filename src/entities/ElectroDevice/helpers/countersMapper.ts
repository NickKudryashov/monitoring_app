import { CANMapper, CounterByCAN, DeviceRecord, ElectroCounter } from "../model/types/electroDevice";

export const createDeviceDict = (counters:ElectroCounter[])=>{
    const result:DeviceRecord = {};
    Object.keys(result);
    counters.forEach((counter)=>{
        if (result[counter.device]) {
            result[counter.device].push(counter);
        }
        else {
            result[counter.device] = [counter,];
        }
    });
    return result;
};

export const createCanDict = (counters:ElectroCounter[])=>{
    const result:CounterByCAN = {"CAN1":[],"CAN2":[],"CAN3":[],"CAN4":[],"RS485":[]};
    counters.forEach((counter)=>{
        result[counter.interface].push(counter);
    });
    return result;
};