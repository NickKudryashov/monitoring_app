import {getByText, render,screen} from "@testing-library/react";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import { AppButon } from "./AppButton";
describe("ui button",()=>{
    test("checktest",()=>{
        componentRender(<AppButon>TEXT</AppButon>);
        expect(screen.getByText("TEXT")).toBeInTheDocument();
    });
});