import { UserObjectFragment } from "../model/types/type";

export const dataToString = (reportData:Record<number,UserObjectFragment>):string[]=>{
    const result:string[] = [];
    for (const objectID in reportData) {
        const currentObject = reportData[objectID].userObjectData;
        result.push(`${currentObject.address} ${currentObject.name} ${currentObject.abonent}\n`);
        for (const systemID in reportData[objectID].systems) {
            const currentSystem = reportData[objectID].systems[systemID].systemInfo;
            result.push(`   ${currentSystem.name}`);
            for (const parameterID in reportData[objectID].systems[systemID].parameters){
                const {max_value,min_value,name} = reportData[objectID].systems[systemID].parameters[parameterID];
                result.push(`     ${name} минимальное значение: ${min_value}  максимальное значение: ${max_value}`);
            }
            result.push("\n");
        }
        result.push("\n\n\n");
    }
    console.log(result);
    return result;
};