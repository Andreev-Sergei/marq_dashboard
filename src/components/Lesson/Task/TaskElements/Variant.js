import React from 'react';
import {Form} from "react-bootstrap";
import {taskBank} from "../../../../helpers/constants";

const Variant = ({variant, word, taskType, handleChangeVariant}) => {
    const inputValue = (variant.right && word) ? word : variant.word

    return (
        <Form.Group
            className="mb-2 d-flex"
            controlId="currectAnswer">
            <Form.Control type="text"
                          disabled={(!word) && taskType !== taskBank.NO_ANSWER && taskType !== taskBank.QUESTION}
                          value={inputValue}
                          onChange={(e) => {
                              handleChangeVariant(variant, e.target.value)
                          }}
            />
            {taskType !== taskBank.NO_ANSWER &&
                <div className={"d-flex align-content-center align-items-center px-3"}
                     style={{background: '#E9ECEF'}}>
                    <Form.Check defaultChecked={variant.right} className={"me-2"}/>
                    Correct
                </div>
            }
        </Form.Group>
    );
};

export default Variant;