import { StateSchema } from "app/providers/StoreProvider/config/stateSchema";
import { defaultAuthCheck, getUserData } from "entities/user";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/hooks";
import { RouteConfigPublic,RouteConfigAuth } from "../config/RouteConfig";

export const AppRouter = () => {

    const isAuth = useSelector((state:StateSchema) => state.user?.isAuth);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(defaultAuthCheck());
        dispatch(getUserData());
    },[dispatch]);
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Routes>
                {Object.values(isAuth ? RouteConfigAuth  : RouteConfigPublic).map(({path,element})=>(
                    <Route 
                        key={path} 
                        path={path} 
                        element={<div className='page-wrapper'>{element}</div>}/>
                ))}
            </Routes>
        </Suspense>
    );
};