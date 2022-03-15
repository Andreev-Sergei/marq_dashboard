import React from 'react';
import {Route, Routes} from "react-router-dom";
import {AUTH_ROUTE, routes} from "../routes";
import Auth from "../pages/Auth";
import {useSelector} from "react-redux";
import headerWrapper from "./HeaderWrapper";



const AppRouter = () => {
    const {isAuth} = useSelector(state => state.user)
    return (
        <Routes>
            <Route path={AUTH_ROUTE} element={<Auth/>} exact/>
            {isAuth && routes.map(({path, Component}) => {
                return <Route key={path} path={path} element={headerWrapper(Component)} exact/>
            })}
            <Route path="*" element={<Auth/>}/> {/* 404 page with link to auth */}
        </Routes>
    );
};

export default AppRouter;