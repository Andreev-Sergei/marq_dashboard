import React from 'react';
import {Form} from "react-bootstrap";

const SelectKeyboadType = ({handleChangeKeyboardType,activeKeyboardType, options}) => {
    return (
        <div className={"px-0 py-3 d-flex align-content-center"}>
            <Form.Select aria-label="Default select example"
                         onChange={e => handleChangeKeyboardType(+e.target.value)}
                         defaultValue={activeKeyboardType}
            >
                {options.map(({id, title}) => {
                    return <option key={id} value={id}>{title}</option>
                })}
            </Form.Select>
        </div>
    );
};

export default SelectKeyboadType;