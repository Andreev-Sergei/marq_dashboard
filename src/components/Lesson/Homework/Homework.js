import React, {useEffect, useState} from 'react';
import {Card, Col, Nav, Row, Tab} from "react-bootstrap";
import ExerciseSettings from "./ExerciseSettings";
import Board from "./Board";
import {useDispatch, useSelector} from "react-redux";
import {setExercise} from "../../../store/reducers/HomeworkSlice";
import $api from "../../../api";

const Exercises = [
    'Exercise #1',
    'Exercise #2',
    'Exercise #3',
]


const Homework = () => {
    const [ex, setEx] = useState(1)
    const {lessonId} = useSelector(state => state.lesson)
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchExe = async () => {
            try {
                if (lessonId) {
                    const {data: serverExercise} = await $api.get(`/dashboard/homework`, {
                        params: {exerciseId: ex, lessonId}
                    })
                    dispatch(setExercise(serverExercise))
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchExe()
        return () => {
        }
    }, [ex, lessonId])

    return (
        <Tab.Container id="left-tabs-example">
            <Row className={"mt-3"}>
                <Col md={4} className={"pe-0"}>
                    <Card className={'py-1 px-3'} style={{height: 250}}>
                        <p className={"mb-2 mt-2"}>Exercises list</p>
                        <Nav variant="pills" className="flex-column">
                            {Exercises?.map((e, index) =>
                                <Nav.Item key={index + 1} className={"mt-2"}>
                                    <Nav.Link role={"button"}
                                              active={index + 1 === ex}
                                              onClick={() => setEx(index + 1)}
                                              className={"text-center py-3"}>
                                        {e}
                                    </Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Card>
                </Col>
                <Col md={8} className={"ps-0"}>
                    <ExerciseSettings ex={ex}/>
                </Col>

            </Row>
            <Row className={"px-2 pe-4 mt-3"}>
                <Board  ex={ex}/>
            </Row>
        </Tab.Container>
    );
}

export default Homework;