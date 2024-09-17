import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { getSubTab, getTab, getTabContentLength } from "./selectors";

describe("subtabs selector",()=>{
    test("selected",()=>{
        const state:DeepPartial<StateSchema> = {tabs:{currentTab:0}};
        expect(getTab(state as StateSchema)).toBe(0);
        expect(getTab(state as StateSchema)).not.toBe(2);
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {tabs:{}};
        expect(getTab(state as StateSchema)).toBeUndefined();
    });
});

describe("subcatCards selector",()=>{
    test("selected",()=>{
        const state:DeepPartial<StateSchema> = {tabs:{currentSubTab:1}};
        expect(getSubTab(state as StateSchema)).toBe(1);
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {tabs:{}};
        expect(getSubTab(state as StateSchema)).toBeUndefined();
    });
});

describe("subcatCards selector",()=>{
    test("selected",()=>{
        const state:DeepPartial<StateSchema> = {tabs:{tabContentLength:{"0":0,"1":2,"2":5,"3":22,"4":9,"5":5}}};
        expect(getTabContentLength(state as StateSchema)).toEqual({"0":0,"1":2,"2":5,"3":22,"4":9,"5":5});
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {tabs:{}};
        expect(getTabContentLength(state as StateSchema)).toBeUndefined();
    });
});