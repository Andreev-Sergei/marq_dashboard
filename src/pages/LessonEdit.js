import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Card, Col, Container, Nav, ProgressBar, Row} from "react-bootstrap";
import {fetchLesson} from "../api/lesson";
import {useDispatch, useSelector} from "react-redux";
import {setLesson, setReviewed} from "../store/reducers/lessonSlice";
import Breadcrumbs from "../components/Lesson/Breadcrumbs";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShare} from "@fortawesome/free-solid-svg-icons";
import MessageEditor from "../components/Lesson/MessageEditor/MessageEditor";
import Message from "../components/Lesson/Message/Message";
import Loading from "../components/Loading";
import TaskBank from "../components/Lesson/TaskBank";
import LessonTaskWrapper from "../components/Lesson/Task/Task";
import {Check} from "react-bootstrap-icons";
import Header from "../components/Header";
import Trainer from "../components/Lesson/Trainer/Trainer";

function LessonBody(props: { fullLesson: any, boardIsLoading: boolean, board: any, element: (chatItem) => JSX.Element }) {


    return <Row className={"py-3"} style={{minHeight: "70vh", background: "#fff"}}>
        <Col md={9} className={"d-grid  pe-1 ps-0"}>
            <Card className={"p-3 d-flex"}
                  style={{flexDirection: "column", justifyContent: "space-between"}}>
                <div
                    className="board pb-3"
                    style={{
                        overflowY: "scroll",
                        display: "flex",
                        flexDirection: "column-reverse",
                        height: "550px"
                    }}
                >
                    {props.boardIsLoading
                        ?
                        <div className="d-flex h-100">
                            <Loading/>
                        </div>
                        :
                        // last item mb-5
                        props.board.map(props.element)
                    }
                </div>

                <MessageEditor/>
            </Card>
        </Col>
        <Col md={3}
             className={"d-flex"}
             style={{flexDirection: "column", justifyContent: "space-between"}}
        >
            <Card className={"px-2 py-2"} style={{height: "100%"}}>
                <p>Task bank</p>
                <TaskBank/>
            </Card>
            <Card className={"p-3 mt-2"}>
                <p>Lesson readiness scale {props.fullLesson} </p>
                <ProgressBar className={"mb-2"} animated variant={"success"}
                             now={(props.fullLesson * 10 <= 10) ? 15 : props.fullLesson * 10}
                             label={`${(props.fullLesson / 1.5).toFixed(1)} m`}/>
                <p className={"text-secondary mb-0 "}>The scale shows how much more material you need to write for the
                    lesson to be ready. The average lesson should last approximately 12-15 minutes</p>
            </Card>
        </Col>
    </Row>;
}

const LESSON_TABS = {
    LESSON: 'LESSON',
    HOMEWORK: 'HOMEWORK',
    TRAINER: 'TRAINER'
}

const LessonEdit = () => {
    const {id: lessonId} = useParams()
    const dispatch = useDispatch()
    const {board, pCourse, pLang, lessonName, reviewed} = useSelector(state => state.lesson)
    const {user} = useSelector(state => state.user)
    const [boardIsLoading, setBoardIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState(LESSON_TABS.LESSON)
    const mockBoard = [
        {
            id: 1,
            type: 'MESSAGE',
            value: 'Hello! <i>It&nbsp;is&nbsp;test</i> message',
            messageType: 'USUAL'
        },
        {
            id: 2,
            type: 'MESSAGE',
            value: 'Second <i>test</i> message',
            messageType: 'VOCABULARY'
        },
        {
            id: 4,
            type: 'TASK',
            taskType: 'INPUT',
            typeTitle: 'Input',
            keyboardType: 1,
            variants: [
                {id: 1, word: 'собака', right: true},
                {id: 2, word: 'кошка', right: false}
            ],
            value: 'Dog - <i>собака</i>'
        }

    ]
    const [fullLesson, setFullLesson] = useState(false)

    useEffect(() => {
        const getLesson = async () => {
            try {
                const {
                    pCourseTitle,
                    pCourseId,
                    pLangTitle,
                    pLangId,
                    lessonName,
                    review
                } = await fetchLesson(lessonId)

                await dispatch(setLesson({
                    lessonId,
                    pCourseTitle,
                    pCourseId,
                    pLangTitle,
                    pLangId,
                    lessonName,
                    review,
                    board: mockBoard.reverse(),
                }))
                setTimeout(() => setBoardIsLoading(false), 500)

                // await dispatch(setCourseLangs(languages))

            } catch (e) {

            }
        }
        getLesson()
    }, [])

    const breadcrumbsProps = {lessonName, lessonId, pCourse, pLang}
    useEffect(() => {
        setFullLesson(board.filter(item => item.type === 'TASK').length)

    }, [board])
    return (
        <>
            <Header {...breadcrumbsProps}/>
            <Container>
                <Row className={'mt-4 '}>
                    <Col className={"p-2"}>
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
                    <Col className={"p-2 d-flex justify-content-end "}>
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
                {activeTab === LESSON_TABS.LESSON &&
                    <LessonBody boardIsLoading={boardIsLoading} fullLesson={fullLesson} board={board}
                                element={chatItem => (
                                    (chatItem.type === 'MESSAGE')
                                        ?
                                        <Message key={chatItem.id} item={chatItem}/>
                                        :
                                        <LessonTaskWrapper key={chatItem.id} item={chatItem}/>
                                )}/>}
                {activeTab === LESSON_TABS.TRAINER && <Trainer/>}
                {/*{activeTab === LESSON_TABS.HOMEWORK && <Trainer/>}*/}
            </Container>
        </>
    );
};

export default LessonEdit;