import App from "app/App";
import { StoreProvider } from "app/providers/StoreProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./app/styles/index.scss";

// import App from "./app/App";
// import ThemeProvider from "./app/providers/ThemeProvider/ui/ThemeProvider";
render(
    // <Provider store={store}>
    <StoreProvider>
        <BrowserRouter>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </StoreProvider>

    // </Provider>

    ,document.getElementById("root")
);