import { DefaultAuth } from "pages/AuthPage";
import { MainPage } from "pages/MainPage";
import { RouteProps } from "react-router-dom";
import { AppRoutes, RoutePath } from "shared/config/RouteConfig/RouteConfig";
import { AuthWidget } from "widgets/AuthWidget/AuthWidget";

export const RouteConfig: Record<AppRoutes,RouteProps> = {
    [AppRoutes.MAIN]:{
        path: RoutePath.main,
        element:<MainPage/>},
    [AppRoutes.AUTH]:{
        path:RoutePath.auth,
        element:<AuthWidget/>
    }
}