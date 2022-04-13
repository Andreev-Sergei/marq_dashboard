import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Nav, ProgressBar, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setLesson, setReviewed} from "../store/reducers/lessonSlice";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShare} from "@fortawesome/free-solid-svg-icons";
import {Check} from "react-bootstrap-icons";
import Header from "../components/Header";
import Trainer from "../components/Lesson/Trainer/Trainer";
import Homework from "../components/Lesson/Homework/Homework";
import LessonBody from "../components/Lesson/LessonBody/LessonBody";
import LessonService from "../services/LessonService";
import {useParams} from "react-router-dom";


const LESSON_TABS = {
    LESSON: 'LESSON',
    HOMEWORK: 'HOMEWORK',
    TRAINER: 'TRAINER'
}

const LessonEdit = () => {
    const {id: lessonId} = useParams()
    const {user} = useSelector(state => state.user)
    const [activeTab, setActiveTab] = useState(LESSON_TABS.LESSON)
    const dispatch = useDispatch()
    const [fullLesson, setFullLesson] = useState(10)
    const {reviewed} = useSelector(state => state.lesson)
    const [boardIsLoading, setBoardIsLoading] = useState(true)

    useEffect(() => {
        const getLessonBody = async () => {
            try {

                setTimeout(async () => {
                    const response = await LessonService.fetchLesson(lessonId)
                    await dispatch(setLesson(response.data))
                    setBoardIsLoading(false)
                },1000)
            } catch (e) {

            }
        }
        getLessonBody()

    }, [])
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
                            {user.role === 'REVIEWER' &&
                                <Button className={"me-1"} disabled={reviewed}
                                        onClick={() => dispatch(setReviewed())}
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
                {activeTab === LESSON_TABS.LESSON && <LessonBody fullLesson={fullLesson} boardIsLoading={boardIsLoading}/>}
                {/*<LessonBody boardIsLoading={boardIsLoading} fullLesson={fullLesson} board={board}*/}
                {/*            element={chatItem => (*/}
                {/*                (chatItem.type === 'MESSAGE')*/}
                {/*                    ?*/}
                {/*                    <Message key={chatItem.id} item={chatItem}/>*/}
                {/*                    :*/}
                {/*                    <LessonTaskWrapper key={chatItem.id} item={chatItem}/>*/}
                {/*            )}/>}*/}
                {activeTab === LESSON_TABS.TRAINER && <Trainer/>}
                {activeTab === LESSON_TABS.HOMEWORK && <Homework/>}
            </Container>
        </>
    );
};

export default LessonEdit;