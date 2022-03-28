import React, {useEffect, useMemo, useState} from 'react';
import {Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

const Matching = ({Confirm, initialMatchingData}) => {
    const {register, handleSubmit, getValues, formState: {errors}} = useForm()
    const [matchingData, setMatchingData] = useState(initialMatchingData || null)

    const handleChange = () => {
        setMatchingData(getValues())
    }

    useEffect(() => console.log(matchingData), [matchingData])
    return (
        <form onChange={handleChange} className={"px-0 py-3 "}>
            <Form.Group
                className="mb-3 d-flex"
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
                className="mb-3 d-flex"
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
                className="mb-3 d-flex"
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