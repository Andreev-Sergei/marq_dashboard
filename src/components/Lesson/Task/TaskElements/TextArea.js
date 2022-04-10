import React from 'react';
import {Card} from "react-bootstrap";
import {Code} from "react-bootstrap-icons";
import ContentEditable from "react-contenteditable";
import {taskBank} from "../../../../helpers/constants";
import styles from "./TaskElements.module.sass"

const TextArea = ({msg, keyPress, handleInputChange, taskType}) => {
    //TODO highlited keyboard symbools avalable
    return (
        <Card>
            <Card.Header className={"px-0 d-flex justify-content-start"}>
                {taskType !== taskBank.NO_ANSWER &&
                    <span className={"px-2 py-1 ms-1 bg-primary d-flex justify-content-start align-items-center"}
                         style={{cursor: 'pointer'}}
                         onMouseDown={evt => {
                             evt.preventDefault();
                             document.execCommand('italic', false, 'italic');
                         }}>
                        <Code
                            color={"#fff"}

                        />
                    </span>
                }
            </Card.Header>
            <Card.Body className={"m-0 p-0"}>
                <ContentEditable
                    className={styles.contentEditable}
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