import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { getPumpPageParameterGroup } from "./selectors";

describe("subcatCards selector",()=>{
    test("selected",()=>{
        const state:DeepPartial<StateSchema> = {pumpPage:{selectedParameterSubGroup:"general"}};
        expect(getPumpPageParameterGroup(state as StateSchema)).toBe("general");
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {pumpPage:{}};
        expect(getPumpPageParameterGroup(state as StateSchema)).toBeUndefined();
    });
});