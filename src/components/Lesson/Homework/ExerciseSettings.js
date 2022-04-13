import React, {useEffect, useMemo, useState} from 'react';
import {Card, Col, FormControl, InputGroup, Row, Form, Button} from "react-bootstrap";
import {getKeyboardArrayByTaskType, keyboardTypesForTask, taskBank} from "../../../helpers/constants";
import {useForm} from "react-hook-form";

const ExerciseSettings = ({ex, setActiveExercise}) => {
    const {register, getValues, setValue, handleSubmit, replace, formState: {errors}} = useForm()


    useMemo(() => {
        setValue("Name", ex?.name);
        setValue("Description", ex?.description);
        setValue("Section", ex?.section);

        const fetchExercises = (id) => {
            // const exercisess = []
            // setExercises(exercisess)
        }
    }, [ex])

    const setType = (type) => {

    }
    const setTypeKeyboardTYpe = (type) => {
    }
    const handleSubmitEx = () => {
        const exi = {
            id: Date.now(),
            name: 'NEW',
            section: 'NEW 2',
            description: 'NEW 4',
            typeOfTask: taskBank.INSERTION,
            keyboardType: keyboardTypesForTask.find(x => x.id === 5).id
        }
        if (ex === 'NEW') {
            setActiveExercise(exi)
        }
    }
    return (
        <Card className={'py-2 px-2'} style={{height: 250}}>
            <p className={"mb-2"}>Exercise id <span
                className={"p-1 px-2 ms-2 rounded float-right text-white bg-primary"}>{ex.id || 'NEW'}</span>
            </p>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
                <FormControl
                    aria-label="Name"
                    aria-describedby="inputGroup-sizing-default"
                    {...register("Name", {required: true})}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Section</InputGroup.Text>
                <FormControl
                    aria-label="Section"
                    aria-describedby="inputGroup-sizing-default"
                    {...register("Section", {required: true})}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Description</InputGroup.Text>
                <FormControl
                    aria-label="Description"
                    aria-describedby="inputGroup-sizing-default"
                    {...register("Description", {required: true})}
                />
            </InputGroup>
            <Row>
                <Col className={"pe-0"}>
                    <Form.Select aria-label="Default select example" value={ex.typeOfTask || ''}
                                 onChange={(ev) => setType(ev.target.value)}>
                        <option value={taskBank.INPUT}>INPUT</option>
                        <option value={taskBank.INSERTION}>INSERTION</option>
                        <option value={taskBank.MATCHING}>MATCHING</option>
                        <option value={taskBank.LISTENING}>LISTENING</option>
                    </Form.Select>
                </Col>
                <Col className={"pe-0"}>
                    <Form.Select aria-label="Default select example"
                                 onChange={(ev) => setTypeKeyboardTYpe(ev.target.value)} value={ex.keyboardType || ''}>
                        {getKeyboardArrayByTaskType(ex.type).map((keyboard) =>
                            <option key={keyboard.id} value={keyboard.id}>{keyboard.title}</option>)}
                    </Form.Select>
                </Col>
                <Col md={2} className={"d-flex justify-content-end"}>
                    <Button disabled={false} onClick={handleSubmitEx}
                            className={"w-100"}>{(ex === 'NEW') ? 'Create' : 'Save'}</Button>
                </Col>
            </Row>

        </Card>

    );
};

export default ExerciseSettings;