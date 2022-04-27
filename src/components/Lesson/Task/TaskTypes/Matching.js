import React from 'react';
import {Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

const Matching = ({matchingData, setMatchingData, setEdit}) => {
    const {register, getValues} = useForm()

    const handleChange = () => {
        setMatchingData(getValues())
        setEdit(true)
    }
    return (
        <form onChange={handleChange} className={"px-0 py-0 "}>
            <Form.Group
                className="mb-2 d-flex"
                controlId="currectAnswer">
                <Form.Control type="text"
                              className={"me-1"}
                              defaultValue={matchingData?.first_key}
                              {...register("first_key", {required: true})}
                />
                <Form.Control type="text"
                              className={"ms-1"}
                              defaultValue={matchingData?.first_value}
                              {...register("first_value", {required: true})}
                />
            </Form.Group>
            <Form.Group
                className="mb-2 d-flex"
                controlId="currectAnswer">
                <Form.Control type="text"
                              className={"me-1"}
                              defaultValue={matchingData?.second_key}
                              {...register("second_key", {required: true})}
                />
                <Form.Control type="text"
                              className={"ms-1"}
                              defaultValue={matchingData?.second_value}
                              {...register("second_value", {required: true})}
                />
            </Form.Group>
            <Form.Group
                className="mb-2 d-flex"
                controlId="currectAnswer">
                <Form.Control type="text"
                              className={"me-1"}
                              defaultValue={matchingData?.third_key}
                              {...register("third_key", {required: true})}
                />
                <Form.Control type="text"
                              className={"ms-1"}
                              defaultValue={matchingData?.third_value}
                              {...register("third_value", {required: true})}
                />
            </Form.Group>
        </form>
    );
};

export default Matching;