import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import {getIsAuth,getUserName,getVersion} from "./selectors";
describe("user selector",()=>{
    test("is auth",()=>{
        const state:DeepPartial<StateSchema> = {user:{isAuth:true}};
        expect(getIsAuth(state as StateSchema)).toBe(true);
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {user:{}};
        expect(getIsAuth(state as StateSchema)).toBeUndefined();
    });
});

describe("username",()=>{
    test("username almost empty",()=>{
        const state:DeepPartial<StateSchema> = {user:{isAuth:true,userdata:{}}};
        expect(getUserName(state as StateSchema)).toBeUndefined();
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {user:{}};
        expect(getUserName(state as StateSchema)).toBeUndefined();
    });
    test("empty",()=>{
        const state:DeepPartial<StateSchema> = {user:{userdata:{name:"username"}}};
        expect(getUserName(state as StateSchema)).toBe("username");
    });
});