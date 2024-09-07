import { memo } from "react";

import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/stateSchema";

interface StoreProviderProps {
    className?: string;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = memo(
    (props: PropsWithChildren<StoreProviderProps>) => {
        const { children, initialState } = props;
        const store = createReduxStore(initialState);
        return <Provider store={store}>{children}</Provider>;
    },
);
StoreProvider.displayName = "StoreProvider";
