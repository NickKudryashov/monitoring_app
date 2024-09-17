import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { getSelectedSubcategory } from "./selectors";
import { SubcategoryAnswer } from "../../api/api";

const mockSubcat:SubcategoryAnswer = {
    enabled:true,
    id:1,
    last_update:"123",
    name:"Имя",
    order_index:0,
    status:"success",
    subcategory_type:"heat_energy_node",
    user_object:1
};


describe("object subcat selector",()=>{
    test("selected subcat",()=>{
        const state:DeepPartial<StateSchema> = {objSubCat:{selectedSubcategory:mockSubcat}};
        expect(getSelectedSubcategory(state as StateSchema)).toEqual(mockSubcat);
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {objSubCat:{}};
        expect(getSelectedSubcategory(state as StateSchema)).toBeUndefined();
    });
});
