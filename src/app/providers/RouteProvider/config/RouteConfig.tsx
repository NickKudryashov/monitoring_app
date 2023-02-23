import { AuthPage } from "pages/AuthPage/ui/AuthPage";
import { MainPage } from "pages/MainPage";
import { RouteProps } from "react-router-dom";
import { RoutePathPublic,RoutePathAuth, AppRoutesAuth, AppRoutesPublic } from "shared/config/RouteConfig/RouteConfig";

export const RouteConfigPublic: Record<string,RouteProps> = {
    [AppRoutesPublic.AUTH]:{
        path:RoutePathPublic.auth,
        element:<AuthPage/>
    },
    [AppRoutesPublic.REDIRECT]:{
        path:RoutePathPublic.redir,
        element:<AuthPage/>
    }
};
export const RouteConfigAuth: Record<string,RouteProps> = {
    [AppRoutesAuth.MAIN]:{
        path: RoutePathAuth.main,
        element:<MainPage/>},
    [AppRoutesAuth.REDIRECT]:{
        path: RoutePathAuth.redir,
        element:<MainPage/>}, 
};