import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {getKeyboardArrayByTaskType, taskBank} from "../../../helpers/constants";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {setExercise} from "../../../store/reducers/HomeworkSlice";
import $api from "../../../api";

const ExerciseSettings = ({ex}) => {
    const {register, getValues, setValue, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const {exercise: exe} = useSelector(state => state.homework)
    const {lessonId} = useSelector(state => state.lesson)

    useEffect(() => {
        setValue("name", exe?.name);
        setValue("description", exe?.description);
        setValue("section", exe?.section);
        setValue("keyboardType", exe?.keyboardType);
        setValue("typeOfTask", exe?.typeOfTask);
    }, [exe?.id])


    const handleSubmitEx = async () => {
        try {
            const exercise = {
                ...getValues()
            }
            let newExercise = null
            if (exe) {
                newExercise = await $api.put('dashboard/homework', exercise, {
                    params: {
                        exerciseId: +ex, lessonId
                    }
                })
                console.log('edit ex')
            } else {
                newExercise = await $api.post('dashboard/homework', exercise, {
                    params: {
                        exerciseId: +ex, lessonId
                    }
                })
                console.log('create ex')
            }
            dispatch(setExercise({...newExercise.data, id: +newExercise.data.id}))
            setIsEdit(false)
        } catch (e) {

        }
    }
    return (
        <Form className={'py-2 px-2'}
              style={{height: 250}}
              onSubmit={handleSubmit(handleSubmitEx)}
              onChange={() => setIsEdit(true)}
        >
            <p className={"mb-2"}>Exercise id <span
                className={"p-1 px-2 ms-2 rounded float-right text-white bg-primary"}>{exe?.id || 'NEW'}</span>
            </p>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
                <FormControl
                    aria-label="Name"
                    aria-describedby="inputGroup-sizing-default"
                    {...register("name", {required: true})}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Section</InputGroup.Text>
                <FormControl
                    aria-label="Section"
                    aria-describedby="inputGroup-sizing-default"
                    {...register("section", {required: true})}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Description</InputGroup.Text>
                <FormControl
                    aria-label="Description"
                    aria-describedby="inputGroup-sizing-default"
                    {...register("description", {required: true})}
                />
            </InputGroup>
            <Row>
                <Col className={"pe-0"}>
                    <Form.Select aria-label="Default select example"
                                 {...register("typeOfTask", {required: true})}
                    >
                        <option value={taskBank.INPUT}>INPUT</option>
                        <option value={taskBank.INSERTION}>INSERTION</option>
                        <option value={taskBank.MATCHING}>MATCHING</option>
                        <option value={taskBank.LISTENING}>LISTENING</option>
                    </Form.Select>
                </Col>
                <Col className={"pe-0"}>

                    <Form.Select aria-label="Default select example"
                                 style={{display: exe?.typeOfTask == taskBank.MATCHING ? 'none' : ''}}
                                 {...register("keyboardType", {required: false})}
                    >
                        {getKeyboardArrayByTaskType(exe?.type).map((keyboard) =>
                            <option key={keyboard.id} value={keyboard.id}>{keyboard.title}</option>
                        )}
                    </Form.Select>
                </Col>
                <Col md={2} className={"d-flex justify-content-end"}>
                    <Button disabled={!isEdit}
                            type={"submit"}
                            className={"w-100"}
                    >
                        {(exe === 'NEW') ? 'Create' : 'Save'}
                    </Button>
                </Col>
            </Row>

        </Form>

    );
};

export default ExerciseSettings;