import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Card, Col, ProgressBar, Row} from "react-bootstrap";
import LessonService from "../../../services/LessonService";
import {setLesson} from "../../../store/reducers/lessonSlice";
import Loading from "../../Loading";
import Message from "../Message/Message";
import LessonTaskWrapper from "../Task/Task";
import MessageEditor from "../MessageEditor/MessageEditor";
import TaskBank from "../TaskBank";

const LessonBody = ({fullLesson,boardIsLoading}) => {

    const {board} = useSelector(state => state.lesson)


    return (
        <Row className={"py-3"} style={{minHeight: "70vh", background: "#fff"}}>
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
                        {boardIsLoading
                            ?
                            <div className="d-flex h-100">
                                <Loading/>
                            </div>
                            : <>{board.map(item =>
                                (item.type === 'MESSAGE')
                                    ? <Message key={item.id} item={item}/>
                                    : <LessonTaskWrapper key={item.id} item={item}/>
                            )}</>
                            // last item mb-5
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
                    <p>Lesson readiness scale {fullLesson} </p>
                    <ProgressBar className={"mb-2"} animated variant={"success"}
                                 now={(fullLesson * 10 <= 10) ? 15 : fullLesson * 10}
                                 label={`${(fullLesson / 1.5).toFixed(1)} m`}/>
                    <p className={"text-secondary mb-0 "}>The scale shows how much more material you need to
                        write for the
                        lesson to be ready. The average lesson should last approximately 12-15 minutes</p>
                </Card>
            </Col>
        </Row>
    );
};

export default LessonBody;