import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { getDatasets } from "./selectors";

describe("chartSelector",()=>{
    test("empty datasets",()=>{
        const state:DeepPartial<StateSchema> = {chart:{}};
        expect(getDatasets(state as StateSchema)).toEqual([]);
    });
    test("empty datasets",()=>{
        const state:DeepPartial<StateSchema> = {chart:{datasets:[{name:"Мок",id:1,data:[{datetime:1000,value:10}]}]}};
        expect(getDatasets(state as StateSchema)).toEqual([{name:"Мок",id:1,data:[{datetime:1000,value:10}]}]);
    });
});