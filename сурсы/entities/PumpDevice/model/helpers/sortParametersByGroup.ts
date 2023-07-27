import { PumpParameter } from "../types/pumpDevice";


interface ResultMapper {
    [ Key : string]:PumpParameter[];
}

export const createParameterGroups = (parameters:PumpParameter[]):ResultMapper=>{
    const result:ResultMapper = {};
    for (const parameter of parameters) {
        if (!result[parameter.parameter_group]){
            result[parameter.parameter_group] = [parameter,];
        }
        else {
            result[parameter.parameter_group].push(parameter);
        }
        // console.log(result);
    }
    return result;

};