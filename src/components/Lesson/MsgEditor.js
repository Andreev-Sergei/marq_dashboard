import React, {useEffect, useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addChatItem, editChatItem as editChatItemAction} from "../../store/reducers/lessonSlice";
import ContentEditable from "react-contenteditable";
import * as sanitizeHtml from 'sanitize-html';

const EditButton = ({cmd, arg, name}) => {
    return (
        <button
            style={{background: 'transparent', border: 'none'}}
            key={cmd}
            onMouseDown={evt => {
                evt.preventDefault();
                document.execCommand(cmd, false, arg);
            }}
        >
            {name || cmd}
        </button>
    );
}

const MsgEditor = () => {
    const {editChatItem} = useSelector(state => state.lesson)
    const [msg, setMsg] = useState(`Type here the next Marq’s message`)
    const [msgType, setMsgType] = useState('USUAL')
    const [isEmpty, setIsEmpty] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (editChatItem) {
            setMsg(editChatItem.value)
            console.log(msgType)
            setMsgType(editChatItem.messageType)
        }
    }, [editChatItem])

    const addMessage = () => {
        if (editChatItem) {
            const chatItem = {
                id: editChatItem.id,
                type: 'MESSAGE',
                value: msg,
                messageType: msgType
            }
            dispatch(editChatItemAction(chatItem))
        }
        if ((msg) && (!editChatItem)) {
            dispatch(addChatItem({
                id: Date.now(),
                type: 'MESSAGE',
                value: msg,
                messageType: msgType
            }))
        }
        setMsg('')
        setMsgType('USUAL')
    }

    const sanitizeConf = {
        allowedTags: ["b", "i"],
        allowedAttributes: false
    }

    const keyPress = (event) => {
        if (event.charCode === 13) {
            event.preventDefault()
        }
    }

    const sanitize = () => {
        const a = sanitizeHtml(msg.replace('&nbsp;', ' '), sanitizeConf)
        setMsg(a);

    };

    const handleChange = evt => {
        const value = evt.target.value
        setMsg(value.replaceAll('&nbsp;', ' '));
        let msgEmpty = (value.length === 0) || (value.replace('<p>', '').replace('</p>').length === 0) || (value == '&nbsp;')
        setIsEmpty(msgEmpty)
    };
    const changeMessageType = (e)=> {
        setMsgType(e.target.value)
    }
    return (
        <div className="d-flex flex-column justify-content-end">
            <Card>
                <Card.Header>
                    {/*TODO вынести элементы управления в отдельный компонент*/}
                    <>
                        <EditButton cmd="bold"/>
                        <EditButton cmd="italic" arg="jest" name="voice"/>
                        <EditButton cmd="insertHTML" arg='<small>USER</small>&nbsp;' name="user"/>
                        <EditButton cmd="insertHTML" arg="🍏" name="emoji"/>
                        {/*TODO add emoji picker & functionality*/}
                    </>
                </Card.Header>
                <Card.Body className={"m-0 mb-2 p-0"}>
                    <ContentEditable
                        className="m-3"
                        style={{height: 60}}
                        tagName="div"
                        onKeyPress={keyPress}
                        html={msg}
                        disabled={false}
                        onChange={handleChange}
                    />
                </Card.Body>
            </Card>

            <div className="mt-3 d-flex justify-content-between">
                <Form className={"d-flex"}>

                    <Form.Check
                        className={"me-3"}
                        onChange={changeMessageType}
                        value={"USUAL"}
                        id={"USUAL"}
                        type={"radio"}
                        label={`Usual`}
                        name={`inline`}
                        checked={(msgType == 'USUAL')}
                    />

                    <Form.Check
                        onChange={changeMessageType}
                        type={"radio"}
                        name={`inline`}
                        value={"VOCABULARY"}
                        id={"VOCABULARY"}
                        checked={(msgType == "VOCABULARY")}
                        label={`Vocabulary`}
                    />
                </Form>
                <>
                    {msgType}
                </>
                <Button
                    onClick={addMessage}
                    variant="primary"
                    className={"justify-self-end"}
                    disabled={isEmpty}
                >

                    {editChatItem ? 'Edit message' : 'Add message'}
                </Button>
            </div>

            <div style={{
                display: 'none', right: 20, background: 'white',
                position: 'fixed', zIndex: 2, bottom: 10,
            }}>
                <textarea
                    style={{height: 200, width: 300}}
                    className="editable"
                    value={msg}
                    onChange={handleChange}
                    onBlur={sanitize}
                />
            </div>
        </div>
    );
};
export default MsgEditor;