import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { getElectroNodesIsLoading } from "./getElectroNodes";

describe("getElectroNodes", () => {
    test("", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getElectroNodesIsLoading(state as StateSchema)).toEqual({});
    });
});