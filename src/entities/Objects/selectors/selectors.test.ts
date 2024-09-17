import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { getAllObjects,getSelectedUserObject } from "./getAllObjects";
import { ObjectItem } from "../reducers/reducers";

const mockObject:ObjectItem = {
    abonent:"Абонент моковый",
    address:"Адрес моковый, дом 12",
    category:1,
    id:1,
    last_update:"2222",
    name:"Название"
};

const objList:ObjectItem[] = [mockObject,mockObject,mockObject,mockObject,mockObject];

describe("all objects selector",()=>{
    test("only selected object",()=>{
        const state:DeepPartial<StateSchema> = {objects:{selectedObject:mockObject}};
        expect(getAllObjects(state as StateSchema)).toBeUndefined();
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {objects:{}};
        expect(getAllObjects(state as StateSchema)).toBeUndefined();
    });
    test("only list",()=>{
        const state:DeepPartial<StateSchema> = {objects:{objects:objList}};
        expect(getAllObjects(state as StateSchema)).toEqual(objList);
    });
});

describe("selected objects selector",()=>{
    test("selected object",()=>{
        const state:DeepPartial<StateSchema> = {objects:{selectedObject:mockObject}};
        expect(getSelectedUserObject(state as StateSchema)).toEqual(mockObject);
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {objects:{}};
        expect(getSelectedUserObject(state as StateSchema)).toBeUndefined();
    });
    test("only list",()=>{
        const state:DeepPartial<StateSchema> = {objects:{objects:objList}};
        expect(getSelectedUserObject(state as StateSchema)).toBeUndefined();
    });
});