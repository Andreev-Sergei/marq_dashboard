import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {setError, setUser} from "../store/reducers/userSlice";
import logo from '../assets/images/logo.png'
import {useNavigate} from "react-router-dom";
import {COURSES_LIST_ROUTE} from "../routes";
import AuthService from "../services/AuthService";
import {useForm} from "react-hook-form";


const Auth = () => {
    const {isAuth, error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {register, getValues, setValue, reset, handleSubmit, replace, formState: {errors}} = useForm()

    useEffect(() => {
        if (isAuth) {
            return navigate(COURSES_LIST_ROUTE);
        }
    }, []);

    const formSubmit = async (e) => {
        const {email, password} = getValues()
        try {
            const response = await AuthService.login(email, password)
            const {data} = response
            localStorage.setItem('token', data.accessToken)
            dispatch(setUser({
                email: data.user.email,
                role: data.user.role
            }))
            dispatch(setError(null))
        } catch (e) {
            dispatch(setError({
                message: e?.response?.data?.message,
                status: e?.response?.status
            }))


        }
    }
    return (
        <Container>
            <Row className={"align-content-center vh-100  justify-content-center"}>
                <Col md={5}>
                    <Form className={"text-center"} onSubmit={handleSubmit(formSubmit)}>
                        <h2 className={"my-3"}>
                            <img src={logo} alt={"logo"} className={"me-1"}
                                 style={{transform: "translateY(-3px)"}}/>
                            <span>Marq.host</span>
                        </h2>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email"
                                          {...register("email", {required: true})}

                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password"
                                          {...register("password", {required: true})}
                            />
                        </Form.Group>

                        <Button variant="primary"
                                type="submit"
                                className={"px-3"}
                        >
                            Login
                        </Button>
                        {error && <Alert className={"mt-3"} variant={"danger"}> {error.message}</Alert>}
                        {errors.email && <Alert className={"mt-3"} variant={"danger"}>Email required</Alert>}
                        {errors.password && <Alert className={"mt-3"} variant={"danger"}>Password is required</Alert>}
                    </Form>
                </Col>
            </Row>
            {/*<Button style={{position: "absolute", right: 20, bottom: 20}} onClick={loginClick}>Login Emulation</Button>*/}
            {/*<Button style={{position: "absolute", right: 20, bottom: 70}}*/}
            {/*        variant={"danger"}*/}
            {/*        onClick={() => dispatch(setError(*/}
            {/*            {*/}
            {/*                        message: 'mock error msg'*/}
            {/*                   }*/}
            {/*        ))}*/}
            {/*>Error auth Emulation</Button>*/}
        </Container>
    );
};

export default Auth;