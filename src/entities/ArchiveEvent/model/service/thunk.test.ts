import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { ArchiveEvent } from "entities/ArchiveEvent/types/type";
import { fetchEvents } from "./fetchEvents";
import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import $api from "shared/api";
import { AsyncThunkTest } from "shared/lib/tests/AsyncThunkTest/thunkTest";
// jest.mock("axios");
jest.mock("axios", () => {
    return {
        create: jest.fn(() => ({
            get: jest.fn(),
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() }
            }
        }))
    };
});
const eventsMocks:ArchiveEvent[] = [
    {
        id:1,
        message:"aboba",
        user_object_info:"object string",
        event_datetime:"11-11-11",
        system:"system name"
    },
    {
        id:2,
        message:"aboba",
        user_object_info:"object string",
        event_datetime:"11-11-11",
        system:"system name"
    }
];


describe("thunk test",()=>{
    const mockedAxios = jest.mocked($api);
    mockedAxios.get.mockReturnValue(Promise.resolve({data:eventsMocks,status:200}));
    test("selected",async ()=>{
        const thunkTest = new AsyncThunkTest(fetchEvents);
        const result = await thunkTest.callThunk({offset:0});
        expect($api.get).toBeCalledTimes(1);
        console.log(result);
        expect(result.payload).toEqual(eventsMocks);
    });
    test("error",async ()=>{
        mockedAxios.get.mockReturnValue(Promise.resolve({status:500}));
        const thunkTest = new AsyncThunkTest(fetchEvents);
        const result = await thunkTest.callThunk({offset:0});
        expect(result.payload).toBe("ERROR");
        expect(thunkTest.dispatch).toBeCalledTimes(2);
        expect(thunkTest.getState).toBeCalledTimes(0);

    });
});