import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {BoxArrowInRight} from 'react-bootstrap-icons';
import logo from '../assets/images/logo.png'
import {useSelector} from "react-redux";

const Header = () => {
        const {isAuth, user} = useSelector(state => state.user)
        if (isAuth) {
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" className={"p-2"} variant="dark">
                    <Navbar.Brand href="#" className={"d-flex justify-content-start align-items-center bi-grid-1x2"}>
                        <img src={logo} alt="" className={"me-1"}/>
                        Marq.host lessons tool
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Item className={"d-grid"}
                                      style={{textAlign: 'end'}}>
                                <span
                                    style={{fontSize: 14}}
                                    className={"link-light"}>{user.email}</span>
                                <span
                                    style={{fontSize: 12}}
                                    className={"text-secondary"}>{user.role}</span>
                            </Nav.Item>
                            <Nav>
                                <Nav.Link className={"p-1"} style={{textAlign: 'end'}}>
                                    <BoxArrowInRight className={"text-secondary"}
                                                     size={24}/>
                                </Nav.Link>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
    }
;

export default Header;