import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { getNavbarSearchValue } from "./getNavbarSearchValue";

describe("navbar selector",()=>{
    test("selected",()=>{
        const state:DeepPartial<StateSchema> = {navbar:{searchValue:"mock"}};
        expect(getNavbarSearchValue(state as StateSchema)).toBe("mock");
        expect(getNavbarSearchValue(state as StateSchema)).not.toBe("mock ");
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {navbar:{}};
        expect(getNavbarSearchValue(state as StateSchema)).toBeUndefined();
    });
});