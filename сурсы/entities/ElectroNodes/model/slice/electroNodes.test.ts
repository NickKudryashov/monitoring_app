import { fetchElectroNodes } from "../services/fetchElectroNodes/fetchElectroNodes";
import { ElectroNodesSchema } from "../types/electroNodes";
import { electroNodesActions, electroNodesReducer } from "./electroNodes";

const data = {};

describe("electroNodesSlice", () => {
    // test("", () => {
    //     const state: DeepPartial<ElectroNodesSchema> = {};
    //     expect(
    //         electroNodesReducer(state as ElectroNodesSchema, electroNodesActions.set())
    //     ).toEqual({});
    // });

    test("test electroNodes service pending", () => {
        const state: DeepPartial<ElectroNodesSchema> = {
            isLoading: false,
            error: "error",
        };
        expect(
            electroNodesReducer(state as ElectroNodesSchema, fetchElectroNodes.pending)
        ).toEqual({
            isLoading: true,
            error: undefined,
        });
    });

    test("test electroNodes service fullfilled", () => {
        const state: DeepPartial<ElectroNodesSchema> = {
            isLoading: true,
            error: "error",
        };
        expect(
            electroNodesReducer(
state as ElectroNodesSchema,
fetchElectroNodes.fulfilled([], "")
            )
        ).toEqual({
            isLoading: false,
            error: undefined,
            data,
        });
    });
});