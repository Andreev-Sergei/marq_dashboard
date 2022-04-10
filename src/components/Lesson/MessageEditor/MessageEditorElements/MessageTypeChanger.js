import React from 'react';
import {Form} from "react-bootstrap";
import {msgTypes} from "../../../../helpers/constants";

const MessageTypeChanger = ({msgType, changeMessageType}) => {
    return (
        <Form className={"d-flex"}>
            <Form.Check
                className={"me-2"}
                onChange={changeMessageType}
                value={msgTypes.USUAL}
                id={msgTypes.USUAL}
                type={"radio"}
                label={`Usual`}
                name={`inline`}
                checked={(msgType == msgTypes.USUAL)}
            />

            <Form.Check
                onChange={changeMessageType}
                className={"me-3 ms-1"}
                type={"radio"}
                name={`inline`}
                value={msgTypes.VOCABULARY}
                id={msgTypes.VOCABULARY}
                checked={(msgType == msgTypes.VOCABULARY)}
                label={`Vocabulary`}
            />
            <Form.Check
                onChange={changeMessageType}
                type={"radio"}
                className={"me-3"}
                name={`inline`}
                value={msgTypes.GIF}
                id={msgTypes.GIF}
                checked={(msgType == msgTypes.GIF)}
                label={`Gif`}
            />
        </Form>
    );
};

export default MessageTypeChanger;