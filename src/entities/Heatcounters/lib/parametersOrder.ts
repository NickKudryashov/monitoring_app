import { HeatDevice, HeatParameters } from "../types/type";

const paramList = [
    "Q",
    "M1",
    "M2",
    "M3",
    "V1",
    "V2",
    "V3",
    "G1",
    "G2",
    "G3",
    "W",
    "t1",
    "t2",
    "t3",
    "t4",
    "P1",
    "P2",
    "P3",
    "G1m",
    "G2m",
    "G3m",
    "T_work"
];
const paramTemplate:Record<string,number> = {};
for (let i = 0;i<paramList.length;i++) {
    paramTemplate[paramList[i]] = i;
}
export const bulkSortParameters = (devices:HeatDevice[])=> {
    const result = devices.map(device=>sortParameters(device));
    return result;
};

export const sortParameters = (device:HeatDevice)=>{
    const newSystems = device.systems.map(system=>({...system,parameters:sortParameters1(system.parameters)}));
    device.systems=newSystems;
    return device;
};

export const sortParameters1 = (parameters:HeatParameters[])=>{
    const result = parameters.sort((a, b) => paramTemplate[a.tag] - paramTemplate[b.tag]);
    return result;
};