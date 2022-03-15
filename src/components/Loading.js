import React from 'react';
import {Spinner} from "react-bootstrap";

const Loading = () => {
    return <Spinner animation="border" color={"grey"} variant={"secondary"} role="status"
                    className={"my-5 mx-auto"}>
        <span className="visually-hidden">Loading...</span>
    </Spinner>
};

export default Loading;