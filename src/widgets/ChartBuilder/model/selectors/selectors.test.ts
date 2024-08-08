import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { getReportData, getSelectedParameters } from "./selectors";
import { SelectedParameters, UserObjectFragment } from "../types/type";

const mockSelParameters:SelectedParameters = {
    auto_node:[{id:1,name:"авто параметр 1",subcat_id:1,user_object_id:2},{id:1,name:"авто параметр 2",subcat_id:1,user_object_id:2}],
    heat_energy_node:[{id:2,name:"тепло параметр 1",subcat_id:1,user_object_id:2},{id:4,name:"тепло параметр 2",subcat_id:1,user_object_id:2}],
    pump_station_node:[{id:3,name:"насос параметр 1",subcat_id:1,user_object_id:2},{id:5,name:"насос параметр 2",subcat_id:1,user_object_id:2}],
    electro_energy_node:[]
};

const mockRepData:Record<number,UserObjectFragment> = {
    0:{
        userObjectData:{abonent:"123",address:"address",category:2,id:1,last_update:"1234321",name:"namee"},
        systems:{
            10:{
                systemInfo:{enabled:true,id:1,last_update:"123123123",name:"name",order_index:0,status:"no_answer",subcategory_type:"auto_node",user_object:1},
                parameters:{
                    21:{
                        name:"param name",
                        max_value:1,
                        min_value:0,
                    }
                }
            }
        }
    },
};


describe("chartbuilder parameters selector",()=>{
    test("selected",()=>{
        const state:DeepPartial<StateSchema> = {chartBuilder:{selectedParameters:mockSelParameters}};
        expect(getSelectedParameters(state as StateSchema)).toEqual(mockSelParameters);
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {chartBuilder:{}};
        expect(getSelectedParameters(state as StateSchema)).toBeUndefined();
    });
});
describe("chartbuilder report data selector",()=>{
    test("selected",()=>{
        const state:DeepPartial<StateSchema> = {chartBuilder:{reportData:mockRepData}};
        expect(getReportData(state as StateSchema)).toEqual(mockRepData);
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {chartBuilder:{}};
        expect(getReportData(state as StateSchema)).toBeUndefined();
    });
});