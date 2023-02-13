import App from "app/App";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { setupStore } from "app/store/store";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import App from "./app/App";
// import ThemeProvider from "./app/providers/ThemeProvider/ui/ThemeProvider";
const store = setupStore();
render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
    ,document.getElementById("root")
);