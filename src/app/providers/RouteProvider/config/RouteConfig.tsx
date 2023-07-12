import {  AdministrationPage } from "pages/AdministrationPage";
import { AuthPage } from "pages/AuthPage/ui/AuthPage";
import { CategoryPage } from "pages/CategoryPage";
import { ElectroDevicePage } from "pages/ElectroDevicePage";
import { ElectroNodePage } from "pages/ElectroNodePage";
import { GeneralInfoPage } from "pages/GeneralInfoPage";
import { HeatDevicePage } from "pages/HeatDevicePage";
import { HeatNodePage } from "pages/HeatNodePage";
import { MainPage } from "pages/MainPage";
import { MockPage } from "pages/MockPage";
import { ObjectPage } from "pages/ObjectPage";
import { PumpDevicePage } from "pages/PumpDevicePage";
import { PumpStationNodePage } from "pages/PumpStationNodePage";
import { RouteProps } from "react-router-dom";
import { RoutePathPublic, AppRoutesAuth, AppRoutesPublic,RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";
import { MockComponent } from "shared/ui/MockComponent/MockComponent";

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
    
    [AppRoutesAuth.CATEGORY]:{
        path:`${RoutePathAuth.category}:id`,
        element:<CategoryPage/>},
    [AppRoutesAuth.OBJECT]:{
        path:`${RoutePathAuth.object}:id`,
        element:<ObjectPage/>},
    [AppRoutesAuth.HEATNODE]:{
        path:`${RoutePathAuth.heatnode}:id`,
        element:<HeatNodePage/>},
    [AppRoutesAuth.HEATDEVICE]:{
        path:`${RoutePathAuth.heatdevice}:id`,
        element:<HeatDevicePage/>},
    [AppRoutesAuth.ELECTRONODE]:{
        path:`${RoutePathAuth.electronode}:id`,
        element:<ElectroNodePage/>},
    [AppRoutesAuth.ELECTRODEVICE]:{
        path:`${RoutePathAuth.electrodevice}:id`,
        element:<ElectroDevicePage/>},
    [AppRoutesAuth.ADMINISTRATION]:{
        path:RoutePathAuth.administration,
        element:<AdministrationPage/>},
    [AppRoutesAuth.GENERALINFO]:{
        path:RoutePathAuth.general,
        element:<GeneralInfoPage/>},
    [AppRoutesAuth.PUMPDEVICE]:{
        path: `${RoutePathAuth.pumpdevice}:id`,
        element:<PumpDevicePage/>},
    [AppRoutesAuth.PUMPNODE]:{
        path: `${RoutePathAuth.pumpnode}:id`,
        element:<PumpStationNodePage/>},
    [AppRoutesAuth.MOCK]:{
        path:RoutePathAuth.mock,
        element:<MockPage/>},
    [AppRoutesAuth.MAIN]:{
        path: RoutePathAuth.main,
        element:<MainPage/>},
    [AppRoutesAuth.REDIRECT]:{
        path: RoutePathAuth.redir,
        element:<MainPage/>} 
};