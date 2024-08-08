import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { getSelectedSystemCard } from "./selectors";
import { SubcategoryAnswer } from "entities/ObjectSubCategory";

const mockSelectedItem:SubcategoryAnswer = {
    enabled:true,
    id:1,
    last_update:"11-11-11",
    name:"myname",
    order_index:1,
    status:"no_answer",
    subcategory_type:"heat_energy_node",
    user_object:1
};


describe("subcatCards selector",()=>{
    test("selected",()=>{
        const state:DeepPartial<StateSchema> = {subcatCards:{selectedItem:mockSelectedItem}};
        expect(getSelectedSystemCard(state as StateSchema)).toEqual(mockSelectedItem);
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {subcatCards:{}};
        expect(getSelectedSystemCard(state as StateSchema)).toBeUndefined();
    });
});