import { StoreProvider } from "@/app/providers/StoreProvider";
import { StateSchema } from "@/app/providers/StoreProvider/config/stateSchema";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

interface ComponentRenderProps {
    initialState?: DeepPartial<StateSchema>;
    route?: string;
}

export const componentRender = (
    component: ReactElement,
    options: ComponentRenderProps,
) => {
    const { initialState, route = "/" } = options;
    render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState}>
                {component}
            </StoreProvider>
        </MemoryRouter>,
    );
};
