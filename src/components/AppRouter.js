import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import {AUTH_ROUTE, routes} from "../routes";
import Auth from "../pages/Auth";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "react-bootstrap";
import {setError} from "../store/reducers/userSlice";


const AppRouter = () => {
    const {isAuth, error} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const toggleShowB = () => {
        dispatch(setError(null))
    };
    return (
        <>
            <Routes>
                <Route path={AUTH_ROUTE} element={<Auth/>} exact/>
                {isAuth && routes.map(({path, Component}) => {
                    return <Route key={path} path={path} element={<Component/>} exact/>
                })}
                <Route path="*" element={<Auth/>}/>
                {/* 404 page with link to auth */}
            </Routes>
            <Toast onClose={toggleShowB}
                   show={!!error}
                   style={{
                       position: 'fixed',
                       top: 20,
                       right: 100
                   }}
                   animation={true}
            >
                <Toast.Header>
                    <strong className="me-auto">Error code {error?.statusCode}</strong>
                </Toast.Header>
                <Toast.Body className={'py-2'}>

                    {error?.message}
                    {error?.statusCode === 402 && <Link to={AUTH_ROUTE}> Авторизация</Link> }
                </Toast.Body>
            </Toast>
        </>
    );
};

export default AppRouter;