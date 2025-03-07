import App from "@/app/App";
import { StoreProvider } from "./app/providers/StoreProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { render } from "react-dom";

import { BrowserRouter } from "react-router-dom";
import "./app/styles/index.scss";
import { MapContextProvider } from "@/shared/lib/components/MapProvider/MapProvider";
import { createRoot } from "react-dom/client";
import {App as AntdApp} from 'antd'
import { AntProvier } from "./app/providers/AntProvider/AntProvider";
// render(
//     <StoreProvider>
//         <BrowserRouter>
//             <MapContextProvider>
//                 <ThemeProvider>
//                     <App />
//                 </ThemeProvider>
//             </MapContextProvider>
//         </BrowserRouter>
//     </StoreProvider>,

//     document.getElementById("root")
// );

const container = document.getElementById("root")!;

// Create a root.
const root = createRoot(container);

// Initial render
root.render(
    <AntdApp>
        <AntProvier>
    <StoreProvider>
        <BrowserRouter>
            <MapContextProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </MapContextProvider>
        </BrowserRouter>
    </StoreProvider>
    </AntProvier>
    </AntdApp>
);
