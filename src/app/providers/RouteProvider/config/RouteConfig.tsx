import {  AdministrationPage } from "pages/AdministrationPage";
import { AuthPage } from "pages/AuthPage/ui/AuthPage";
import AutoSubcategoryPage from "pages/AutoSubcategoryPage/ui/AutoSubcategoryPage/AutoSubcategoryPage";
import { CategoryPage } from "pages/CategoryPage";
import { ElectroDevicePage } from "pages/ElectroDevicePage";
import { ElectroSubcategoryPage } from "pages/ElectroSubcategoryPage";
import { GeneralInfoPage } from "pages/GeneralInfoPage";
import { HeatDevicePage } from "pages/HeatDevicePage";
import { HeatSubcatPage } from "pages/HeatSubcategoryPage";
import { MainPage } from "pages/MainPage";
import { MapPage } from "pages/MapPage";
import { MockPage } from "pages/MockPage";
import { ObjectPage } from "pages/ObjectPage";
import { ObjectSubcatEditPage } from "pages/ObjectSubcatEditPage";
import { ObjectDetailPage } from "pages/ObjectsDetailPage";
import { PumpDevicePage } from "pages/PumpDevicePage";
import { PumpSubcategoryPage } from "pages/PumpSubcategoryPage";
import { RegPage } from "pages/RegistrationPage";
import { SettingsPage } from "pages/SettingsPage";
import { SubCategoryPage } from "pages/SubcartegoryPage";
import { RouteProps } from "react-router-dom";
import { RoutePathPublic, AppRoutesAuth, AppRoutesPublic,RoutePathAuth } from "shared/config/RouteConfig/RouteConfig";

export const RouteConfigPublic: Record<string,RouteProps> = {
    [AppRoutesPublic.AUTH]:{
        path:RoutePathPublic.auth,
        element:<AuthPage/>
    },
    [AppRoutesPublic.REG]:{
        path:RoutePathPublic.reg,
        element:<RegPage/>
    },
    [AppRoutesPublic.REDIRECT]:{
        path:RoutePathPublic.redir,
        element:<MockPage/>
    }
};
export const RouteConfigAuth: Record<string,RouteProps> = {
    
    [AppRoutesAuth.CATEGORY]:{
        path:`${RoutePathAuth.category}:id`,
        element:<CategoryPage/>},
    [AppRoutesAuth.OBJECT]:{
        path:`${RoutePathAuth.object}:id`,
        element:<ObjectPage/>},
    [AppRoutesAuth.OBJECT_EDIT_SUBCAT]:{
        path:`${RoutePathAuth.object_subcat_edit}`,
        element:<ObjectSubcatEditPage/>},
    [AppRoutesAuth.DETAIL_OBJECTS]:{
        path:RoutePathAuth.detail_objects,
        element:<ObjectDetailPage/>},
    [AppRoutesAuth.SETTINGS]:{
        path:RoutePathAuth.settings,
        element:<SettingsPage/>},
    [AppRoutesAuth.HEATDEVICE]:{
        path:`${RoutePathAuth.heatdevice}:id`,
        element:<HeatDevicePage/>},
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
    [AppRoutesAuth.SUBCAT]:{
        path: `${RoutePathAuth.subcat}:id`,
        element:<SubCategoryPage/>},
    [AppRoutesAuth.HEAT_SUBCAT]:{
        path: `${RoutePathAuth.heat_subcat}:id`,
        element:<HeatSubcatPage/>},
    [AppRoutesAuth.AUTO_SUBCAT]:{
        path: `${RoutePathAuth.auto_subcat}:id`,
        element:<AutoSubcategoryPage/>},
    [AppRoutesAuth.PUMP_SUBCAT]:{
        path: `${RoutePathAuth.pump_subcat}:id`,
        element:<PumpSubcategoryPage/>},
    [AppRoutesAuth.ELECTRO_SUBCAT]:{
        path: `${RoutePathAuth.el_subcat}:id`,
        element:<ElectroSubcategoryPage/>},
    [AppRoutesAuth.MOCK]:{
        path:RoutePathAuth.mock,
        element:<MockPage/>},
    [AppRoutesAuth.MAIN]:{
        path: RoutePathAuth.main,
        element:<ObjectDetailPage/>},
    [AppRoutesAuth.MAP]:{
        path: RoutePathAuth.map,
        element:<MapPage/>},
    [AppRoutesAuth.REDIRECT]:{
        path: RoutePathAuth.redir,
        element:<ObjectDetailPage/>} 
};