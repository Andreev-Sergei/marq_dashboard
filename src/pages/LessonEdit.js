import React, {useEffect, useMemo, useState} from 'react';
import {Button, Col, Container, Nav, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setReviewed} from "../store/reducers/lessonSlice";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShare} from "@fortawesome/free-solid-svg-icons";
import {Check} from "react-bootstrap-icons";
import Header from "../components/Header";
import Trainer from "../components/Lesson/Trainer/Trainer";
import Homework from "../components/Lesson/Homework/Homework";
import LessonBody from "../components/Lesson/LessonBody/LessonBody";
import LessonService from "../services/LessonServices/LessonService";
import {useParams} from "react-router-dom";
import {LESSON_TABS, USER_ROLE} from "../helpers/constants";
import $api from "../api";


const LessonEdit = () => {
    const {id: lessonId} = useParams()

    const {reviewed, board} = useSelector(state => state.lesson)
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState(LESSON_TABS.TRAINER)
    const [fullLesson, setFullLesson] = useState(0)

    const approveLesson  = async () => {
        try {
            await $api.patch('/dashboard/lesson', {  approve: true }, {params: {lessonId}})
            dispatch(setReviewed())
        } catch (e) {
        }
    }

    useEffect(() => {
        try {
            const fetchLesson = ()=> {
                dispatch(LessonService.fetchLesson(lessonId))
            }
            fetchLesson()
        }
       catch (e) {

       }
    }, [lessonId])

    useMemo(() => {
        setFullLesson(board.filter(b => b?.userInput).length)
    }, [board])

    return (
        <>
            <Header/>
            <Container>
                <Row className={'mt-3'}>
                    <Col className={"px-0 py-2"}>
                        <Nav variant="pills" className="flex-row">
                            <Nav.Item>
                                <Nav.Link active={activeTab === LESSON_TABS.LESSON} onClick={() => {
                                    setActiveTab(LESSON_TABS.LESSON)
                                }} eventKey="first">Lesson</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link disabled={(fullLesson <= 9)} active={activeTab === LESSON_TABS.HOMEWORK}
                                          onClick={() => {
                                              setActiveTab(LESSON_TABS.HOMEWORK)
                                          }} eventKey="second">Homework</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link disabled={(fullLesson <= 9)} active={activeTab === LESSON_TABS.TRAINER}
                                          onClick={() => {
                                              setActiveTab(LESSON_TABS.TRAINER)
                                          }} eventKey="second">Vocabulary & Trainer</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col className={"d-flex justify-content-end "}>
                        <div>
                            {user.role === USER_ROLE.REVIEWER &&
                                <Button className={"me-1"} disabled={reviewed}
                                        onClick={approveLesson}
                                        variant={"outline-primary"}>
                                    {!reviewed ? <> <Check className={"me-2"}/> Approve</> : 'Approved'}
                                </Button>}
                            <Button disabled={true}>
                                <FontAwesomeIcon icon={faShare} className={"me-2"}/>
                                Submit for review
                            </Button>
                        </div>
                    </Col>
                </Row>
                {activeTab === LESSON_TABS.LESSON && <LessonBody fullLesson={fullLesson}/>}
                {activeTab === LESSON_TABS.HOMEWORK && <Homework/>}
                {activeTab === LESSON_TABS.TRAINER && <Trainer/>}

            </Container>
        </>
    );
};

export default LessonEdit;