import { screen } from "@testing-library/react";
import { componentRender } from "@/shared/test/componentRender";
import { ParameterRow } from "./ParameterRow";
import { AutoParameter } from "@/entities/AutomaticDevice/model/types/AutomaticDeviceTypes";
const MOCK_PARAMETER: AutoParameter = {
    dimension: "dim",
    id: 1,
    system_index: 0,
    tag: "tagparam",
    value: 100,
    verbose: 10,
    writable: false,
};
describe("Auto Parameter Row", () => {
    test("mock parameter", () => {
        componentRender(<ParameterRow parameter={MOCK_PARAMETER} />, {
            initialState: { user: { isAuth: true } },
        });
        expect(screen.getByTestId("AutoParameterRow")).toBeInTheDocument();
        expect(
            screen.getByTestId("AutoParameterRow.ParameterValue"),
        ).toHaveTextContent("10");
    });
});
