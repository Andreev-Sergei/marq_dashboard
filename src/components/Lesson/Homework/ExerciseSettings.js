import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Card, Col, FormControl, InputGroup, Row, Form, Button} from "react-bootstrap";
import {getKeyboardArrayByTaskType, keyboardTypesForTask, taskBank} from "../../../helpers/constants";
import {useForm} from "react-hook-form";
import {fetchLangItem} from "../../../api/course";
import {setLangItem} from "../../../store/reducers/courseSlice";
import {setError} from "../../../store/reducers/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {setExercise} from "../../../store/reducers/HomeworkSlice";

const ExerciseSettings = ({ex}) => {
    const {register, getValues, handleChange, setValue, handleSubmit, replace, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const {exercise: exe} = useSelector(state => state.homework)

    useEffect(() => {
        setValue("name", exe?.name);
        setValue("description", exe?.description);
        setValue("section", exe?.section);
        setValue("keyboardType", exe?.keyboardType);
        setValue("typeOfTask", exe?.typeOfTask);
    }, [exe])


    const handleSubmitEx = () => {
        const exercise = {
            ...getValues(),
            id: (exe !== 'NEW') ? exe.id : Date.now()
        }
        dispatch(setExercise(exercise))
        console.log(exercise)
        setIsEdit(false)
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
                                 {...register("typeOfTask", {required: false})}
                    >
                        <option value={taskBank.INPUT}>INPUT</option>
                        <option value={taskBank.INSERTION}>INSERTION</option>
                        <option value={taskBank.MATCHING}>MATCHING</option>
                        <option value={taskBank.LISTENING}>LISTENING</option>
                    </Form.Select>
                </Col>
                <Col className={"pe-0"}>
                    <Form.Select aria-label="Default select example"
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