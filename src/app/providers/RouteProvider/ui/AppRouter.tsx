import { defaultAuthCheck, getIsAuth, getUserData } from "@/entities/user";
import { Suspense, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { RouteConfigPublic, RouteConfigAuth } from "../config/RouteConfig";
import { MainLayoutPageLoader } from "@/pages/MainLayoutPageLoader";
import { MainLayout } from "@/shared/ui/MainLayout/MainLayout";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { getVersion } from "@/entities/user/Store/actionCreators";
import { useMobilDeviceDetect } from "@/shared/hooks/useMobileDeviceDetect";
import { RoutePathPublic } from "@/shared/config/RouteConfig/RouteConfig";

export const AppRouter = () => {
    const isAuth = useSelector(getIsAuth);
    const dispatch = useAppDispatch();
    const isMobile = useMobilDeviceDetect();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(defaultAuthCheck());
        dispatch(getUserData());
        dispatch(getVersion());
        if (!isAuth && isMobile) {
            navigate(RoutePathPublic.auth);
        }
    }, [dispatch]);

    return (
        <Suspense fallback={<MainLayoutPageLoader />}>
            <Routes>
                {Object.values(
                    isAuth ? RouteConfigAuth : RouteConfigPublic,
                ).map(({ path, element }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <div className="page-wrapper">
                                {isAuth ? (
                                    <MainLayout
                                        navbar={<Navbar />}
                                        sidebar={<Sidebar />}
                                        DetailView={element}
                                    />
                                ) : (
                                    element
                                )}
                            </div>
                        }
                    />
                ))}
            </Routes>
        </Suspense>
    );
};
