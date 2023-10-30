import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { defaultAuthCheck, getUserData } from "entities/user";
import { Suspense, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/hooks";
import { RouteConfigPublic,RouteConfigAuth } from "../config/RouteConfig";
import { MainLayoutPageLoader } from "pages/MainLayoutPageLoader";
import { Footer } from "shared/ui/Footer/Footer";
import { MainLayout } from "shared/ui/MainLayout/MainLayout";
import { DeviceList } from "widgets/DeviceList";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";

export const AppRouter = () => {

    const isAuth = useSelector((state:StateSchema) => state.user?.isAuth);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(defaultAuthCheck());
        dispatch(getUserData());
    },[dispatch]);
    
    return (
        <Suspense  fallback={<MainLayoutPageLoader/>}>
            <Routes>
                {Object.values(isAuth ? RouteConfigAuth  : RouteConfigPublic).map(({path,element})=>(
                    <Route 
                        key={path} 
                        path={path} 
                        element={
                            <div className='page-wrapper'>
                            {isAuth ? 
                                <MainLayout
                                deviceList={<DeviceList/>}
                                footer={<Footer/>}
                                navbar={<Navbar/>}
                                sidebar={<Sidebar/>}
                                DetailView={element}
                                /> :
                                element
                            }
                            </div>
                        }/>
                ))}
            </Routes>
        </Suspense>

    );
};