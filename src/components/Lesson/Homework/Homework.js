import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Card, Col, Nav, Row, Tab, TabContainer} from "react-bootstrap";
import {getKeyboardArrayByTaskType, keyboardTypesForTask, taskBank} from "../../../helpers/constants";
import ExerciseSettings from "./ExerciseSettings";
import Board from "./Board";

const Exercises = [
    'Exercise #1',
    'Exercise #2',
    'Exercise #3',
]


const Homework = () => {
    const [ex, setEx] = useState(1)
    const [activeExercise, setActiveExercise] = useState(null)

    useMemo(() => {
        const getExercise = () => {
            const exi = {
                id: ex,
                name: 'Перевод',
                section: 'Лексика',
                description: 'Помнишь, как это будет по-испански?',
                typeOfTask: taskBank.INSERTION,
                keyboardType: keyboardTypesForTask.find(x => x.id === 5).id
            }

            setActiveExercise((exi.id === 3) ? 'NEW' : exi)
        }
        getExercise()
    }, [ex])

    return (
        <Tab.Container id="left-tabs-example">
            <Row className={"mt-3"}>
                <Col md={4} className={"pe-0"}>
                    <Card className={'py-1 px-3'} style={{height: 250}}>
                        <p className={"mb-2 mt-2"}>Exercises list</p>
                        <Nav variant="pills" className="flex-column">
                            {Exercises.map((e, index) =>
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
                    {activeExercise &&
                        <ExerciseSettings
                            ex={activeExercise}
                            setActiveExercise={setActiveExercise}
                        />}
                    <Board/>
                </Col>

            </Row>
        </Tab.Container>
    );
}

export default Homework;