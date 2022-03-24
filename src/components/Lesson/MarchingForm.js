import React from 'react';
import {Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

const MarchingForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"px-0 py-3 "}>
            <Form.Group
                className="mb-3 d-flex"
                controlId="currectAnswer">
                <Form.Control type="text"
                              className={"me-1"}
                              defaultValue={""}
                              {...register("first_key", { required: true })}
                />
                <Form.Control type="text"
                              className={"ms-1"}
                              defaultValue={""}
                              {...register("first_value", { required: true })}
                />
            </Form.Group>
            <Form.Group
                className="mb-3 d-flex"
                controlId="currectAnswer">
                <Form.Control type="text"
                              className={"me-1"}
                              defaultValue={""}
                              {...register("second_key", { required: true })}
                />
                <Form.Control type="text"
                              className={"ms-1"}
                              defaultValue={""}
                              {...register("second_value", { required: true })}
                />
            </Form.Group>
            <Form.Group
                className="mb-3 d-flex"
                controlId="currectAnswer">
                <Form.Control type="text"
                              className={"me-1"}
                              defaultValue={""}
                              {...register("third_key", { required: true })}
                />
                <Form.Control type="text"
                              className={"ms-1"}
                              defaultValue={""}
                              {...register("third_value", { required: true })}
                />
            </Form.Group>
            <input type={"submit"} className={"btn-primary"}/>
        </form>
    );
};

export default MarchingForm;