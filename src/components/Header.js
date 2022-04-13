import React, {useEffect} from 'react';
import {Breadcrumb, Nav, Navbar} from "react-bootstrap";
import {BoxArrowInRight} from 'react-bootstrap-icons';
import logo from '../assets/images/logo.png'
import {useSelector} from "react-redux";
import {COURSE_ROUTE, COURSES_LIST_ROUTE} from "../routes";

const Header = ({title}) => {
        const {isAuth, user} = useSelector(state => state.user)
        const {board, lessonId, pCourse, pLang, lessonName, reviewed} = useSelector(state => state.lesson)



        useEffect(()=> {
            console.log({lessonName, lessonId, pCourse, pLang})
        }, [lessonId])

        if (isAuth) {
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" className={"p-2"} variant="dark">
                    <Navbar.Brand href={COURSES_LIST_ROUTE}
                                  className={"d-flex justify-content-start align-items-center bi-grid-1x2"}>
                        <img src={logo} alt="" className={"me-1"}/>
                        Marq.host lessons tool
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className=" w-100">
                            <Breadcrumb className={"px-2 mt-3 d-flex"}>
                                <Breadcrumb.Item
                                    href={COURSES_LIST_ROUTE}
                                >
                                    Course List
                                </Breadcrumb.Item>

                                {pCourse?.id && <>
                                    <Breadcrumb.Item
                                        href={COURSE_ROUTE + pCourse.id.toString()}
                                    >
                                        {pCourse.title}
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item
                                        href={COURSE_ROUTE + pCourse.id.toString() + '?langId=' + pLang.id.toString()}
                                    >
                                        {pLang.title}
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active

                                    >
                                        {lessonName}
                                    </Breadcrumb.Item>
                                </>
                                }
                            </Breadcrumb>

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