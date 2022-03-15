import React, {useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {fetchLesson} from "../api/lesson";
import {useDispatch, useSelector} from "react-redux";
import {setLesson} from "../store/reducers/lessonSlice";
import Breadcrumbs from "../components/Lesson/Breadcrumbs";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShare} from "@fortawesome/free-solid-svg-icons";
import MsgEditor from "../components/Lesson/MsgEditor";
import LessonChatItem from "../components/Lesson/LessonChatItem";
import Loading from "../components/Loading";

const LessonEdit = () => {
    const {id: lessonId} = useParams()
    const dispatch = useDispatch()
    const {board, pCourse, pLang, lessonName} = useSelector(state => state.lesson)
    const msgWindow = useRef(null)

    const mockBoard =  [
        {
            id: 1,
            type: 'MESSAGE',
            value: 'Hello! It is <i>test</i> massage'
        },
        {
            id: 2,
            type: 'MESSAGE',
            value: 'Second <i>test</i> massage'
        },
        {
            id: 4,
            type: 'TASK',
            // this format
            value: 'Hello! It is <i>test</i> massage'
        }

    ]

    useEffect(() => {
        const getLesson = async () => {
            try {
                const {
                    pCourseTitle,
                    pCourseId,
                    pLangTitle,
                    pLangId,
                    lessonName
                } = await fetchLesson(lessonId)

                await dispatch(setLesson({
                    lessonId,
                    pCourseTitle,
                    pCourseId,
                    pLangTitle,
                    pLangId,
                    lessonName,
                    board: mockBoard.reverse(),
                }))
                // await dispatch(setCourseLangs(languages))

            } catch (e) {

            }
        }
        getLesson()
    }, [])

    const breadcrumbsProps = {lessonName, lessonId, pCourse, pLang}


    return (
        <Container>
            <Row className={'mt-4 '}>
                <Col className={"p-2 d-flex justify-content-between "}>
                    <Breadcrumbs style={{margin: 0}} {...breadcrumbsProps}/>
                    <Button>
                        <FontAwesomeIcon icon={faShare} className={"me-2"}/>
                        Submit for review
                    </Button>
                </Col>
            </Row>
            <Row className={"py-3"} style={{minHeight: '80vh', background: '#fff'}}>
                <Col md={9} className={"d-grid  pe-1 ps-0"}>
                    <Card className={"p-3 d-flex"} style={{flexDirection: "column", justifyContent: 'space-between'}}>
                        <div
                            className="board"
                            style={{overflowY: 'scroll', display: 'flex', flexDirection: 'column-reverse',  maxHeight: '50vh', height:'50vh'}}
                            ref={msgWindow}
                        >

                            {board.map(chatItem => (
                                    (chatItem.type === 'MESSAGE')
                                        ?
                                        <LessonChatItem key={chatItem.id} item={chatItem}/>
                                        :
                                        <Loading key={chatItem.id}/>// TODO втавить компонент таски
                                )
                            )}

                            <div
                                className={"my-5 p-2 d-inline-block"}
                            />
                        </div>

                        <MsgEditor msgWindow={msgWindow.current}/>
                    </Card>
                </Col>
                <Col md={3}
                     className={"d-flex"}
                     style={{flexDirection: "column", justifyContent: 'space-between'}}
                >
                    <Card className={"px-3 py-2"} style={{height: "100%"}}>
                        <p>Task bank</p>
                    </Card>
                    <Card className={"p-1 mt-3"}/>
                </Col>
            </Row>
        </Container>
    );
};

export default LessonEdit;