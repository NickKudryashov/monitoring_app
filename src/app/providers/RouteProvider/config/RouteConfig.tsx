import { DefaultAuth } from "pages/AuthPage";
import { MainPage } from "pages/MainPage";
import { RouteProps } from "react-router-dom";
import { RoutePathPublic,RoutePathAuth, AppRoutesAuth, AppRoutesPublic } from "shared/config/RouteConfig/RouteConfig";
import { AuthWidget } from "widgets/AuthWidget/AuthWidget";

export const RouteConfigPublic: Record<string,RouteProps> = {
    [AppRoutesPublic.AUTH]:{
        path:RoutePathPublic.auth,
        element:<AuthWidget/>
    },
    [AppRoutesPublic.REDIRECT]:{
        path:RoutePathPublic.redir,
        element:<AuthWidget/>
    }
}
export const RouteConfigAuth: Record<string,RouteProps> = {
    [AppRoutesAuth.MAIN]:{
        path: RoutePathAuth.main,
        element:<MainPage/>},
        [AppRoutesAuth.REDIRECT]:{
            path: RoutePathAuth.redir,
            element:<MainPage/>}, 
}