// import { fetchElectroDevice } from "../services/fetchElectroDevice/fetchElectroDevice";
// import { ElectroDeviceSchema } from "../types/electroDevice";
// import { electroDeviceActions, electroDeviceReducer } from "./electroDevice";

// const data = {};

// describe("electroDeviceSlice", () => {
//     test("", () => {
//         const state: DeepPartial<ElectroDeviceSchema> = {};
//         expect(
//             electroDeviceReducer(state as ElectroDeviceSchema, electroDeviceActions.set(true))
//         ).toEqual({});
//     });

//     test("test electroDevice service pending", () => {
//         const state: DeepPartial<ElectroDeviceSchema> = {
//             isLoading: false,
//             error: "error",
//         };
//         expect(
//             electroDeviceReducer(state as ElectroDeviceSchema, fetchElectroDevice.pending)
//         ).toEqual({
//             isLoading: true,
//             error: undefined,
//         });
//     });

//     test("test electroDevice service fullfilled", () => {
//         const state: DeepPartial<ElectroDeviceSchema> = {
//             isLoading: true,
//             error: "error",
//         };
//         expect(
//             electroDeviceReducer(
// state as ElectroDeviceSchema,
// fetchElectroDevice.fulfilled(data, "")
//             )
//         ).toEqual({
//             isLoading: false,
//             error: undefined,
//             data,
//         });
//     });
// });

export {};