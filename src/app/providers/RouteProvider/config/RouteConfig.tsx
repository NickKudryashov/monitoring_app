import { AdministrationPage } from '@/pages/AdministrationPage'
import { AuthPage } from '@/pages/AuthPage/ui/AuthPage'
import AutoSubcategoryPage from '@/pages/AutoSubcategoryPage/ui/AutoSubcategoryPage/AutoSubcategoryPage'
import { CategoryPage } from '@/pages/CategoryPage'
import { ElectroSubcategoryPage } from '@/pages/ElectroSubcategoryPage'
import { HeatSubcatPage } from '@/pages/HeatSubcategoryPage'
import { MapPage } from '@/pages/MapPage'
import { MockPage } from '@/pages/MockPage'
import { ObjectPage } from '@/pages/ObjectPage'
import { ObjectSubcatEditPage } from '@/pages/ObjectSubcatEditPage'
import { ObjectDetailPage } from '@/pages/ObjectsDetailPage'
import { PumpSubcategoryPage } from '@/pages/PumpSubcategoryPage'
import { RegPage } from '@/pages/RegistrationPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { RouteProps } from 'react-router-dom'
import {
    RoutePathPublic,
    AppRoutesAuth,
    AppRoutesPublic,
    RoutePathAuth,
} from '@/shared/config/RouteConfig/RouteConfig'
import { AutoSubcatPage } from '@/pages/AutoSubcategoryPage'
import ActivatePage from '@/pages/ActivatePage/ActivatePage'

export const RouteConfigPublic: Record<string, RouteProps> = {
    [AppRoutesPublic.AUTH]: {
        path: RoutePathPublic.auth,
        element: <AuthPage />,
    },

    [AppRoutesPublic.REG]: {
        path: RoutePathPublic.reg,
        element: <RegPage />,
    },
    [AppRoutesPublic.REDIRECT]: {
        path: RoutePathPublic.redir,
        element: <AuthPage />,
    },
    [AppRoutesPublic.ACTIVATE]: {
        path: AppRoutesAuth.ACTIVATE,
        element: <ActivatePage />,
    },
}
export const RouteConfigAuth: Record<string, RouteProps> = {
    [AppRoutesAuth.CATEGORY]: {
        path: `${RoutePathAuth.category}`,
        element: <CategoryPage />,
    },
    // [AppRoutesAuth.ACTIVATE]: {
    //     path: AppRoutesAuth.ACTIVATE,
    //     element: <ActivatePage />,
    // },
    [AppRoutesAuth.OBJECT]: {
        path: `${RoutePathAuth.object}:id`,
        element: <ObjectPage />,
    },
    [AppRoutesAuth.OBJECT_EDIT_SUBCAT]: {
        path: `${RoutePathAuth.object_subcat_edit}`,
        element: <ObjectSubcatEditPage />,
    },
    [AppRoutesAuth.DETAIL_OBJECTS]: {
        path: RoutePathAuth.detail_objects,
        element: <ObjectDetailPage />,
    },
    [AppRoutesAuth.SETTINGS]: {
        path: RoutePathAuth.settings,
        element: <SettingsPage />,
    },
    [AppRoutesAuth.ADMINISTRATION]: {
        path: RoutePathAuth.administration,
        element: <AdministrationPage />,
    },
    [AppRoutesAuth.HEAT_SUBCAT]: {
        path: `${RoutePathAuth.heat_subcat}:id`,
        element: <HeatSubcatPage />,
    },
    [AppRoutesAuth.AUTO_SUBCAT]: {
        path: `${RoutePathAuth.auto_subcat}:id`,
        element: <AutoSubcatPage />,
    },
    [AppRoutesAuth.PUMP_SUBCAT]: {
        path: `${RoutePathAuth.pump_subcat}:id`,
        element: <PumpSubcategoryPage />,
    },
    [AppRoutesAuth.ELECTRO_SUBCAT]: {
        path: `${RoutePathAuth.el_subcat}:id`,
        element: <ElectroSubcategoryPage />,
    },
    [AppRoutesAuth.MOCK]: {
        path: RoutePathAuth.mock,
        element: <MockPage />,
    },
    [AppRoutesAuth.MAIN]: {
        path: RoutePathAuth.main,
        element: <ObjectDetailPage />,
    },
    [AppRoutesAuth.MAP]: {
        path: RoutePathAuth.map,
        element: <MapPage />,
    },
    [AppRoutesAuth.REDIRECT]: {
        path: RoutePathAuth.redir,
        element: <ObjectDetailPage />,
    },
}
