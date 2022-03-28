import React from 'react';
import {Card} from "react-bootstrap";
import {Code} from "react-bootstrap-icons";
import ContentEditable from "react-contenteditable";
import {taskBank} from "../../../../helpers/constants";

const TextArea = ({msg, keyPress, handleInputChange, taskType}) => {
    return (
        <Card>
            <Card.Header className={"px-0"}>
                {taskType !== taskBank.NO_ANSWER &&
                    <>
                        <Code
                            color={"#0d6efd"}
                            onMouseDown={evt => {
                                evt.preventDefault();
                                document.execCommand('italic', false, 'italic');
                            }}
                        />
                    </>
                }
            </Card.Header>
            <Card.Body className={"m-0 p-0"}>
                <ContentEditable
                    className={"px-1"}
                    style={{height: 80}}
                    tagName="div"
                    onKeyPress={keyPress}
                    html={msg}
                    disabled={false}
                    onChange={handleInputChange}
                />
            </Card.Body>

        </Card>
    );
};

export default TextArea;