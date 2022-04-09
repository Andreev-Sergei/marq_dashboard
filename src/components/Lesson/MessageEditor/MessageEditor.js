import React, {createRef, useEffect, useRef, useState} from 'react';
import {Button, Card, Form, OverlayTrigger, Popover} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addChatItem, cancelMsgEdit, editChatItem as editChatItemAction} from "../../../store/reducers/lessonSlice";
import ContentEditable from "react-contenteditable";
import * as sanitizeHtml from 'sanitize-html';
import GiphyPicker from "./MessageEditorElements/GiphyPicker";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import {msgTypes} from "../../../helpers/constants";
import Editor from "./MessageEditorElements/Editor";
import MessageTypeChanger from "./MessageEditorElements/MessageTypeChanger";


const MessageEditor = () => {
    const {editChatItem} = useSelector(state => state.lesson)
    const [msg, setMsg] = useState(`Type here the next Marq’s message`)
    const [msgType, setMsgType] = useState(msgTypes.USUAL)
    const [gif, setGif] = useState(null)
    const [isEmpty, setIsEmpty] = useState(false)
    const dispatch = useDispatch()
    const con = useRef(null)

    useEffect(() => {
        if (editChatItem) {
            setMsg(editChatItem.value)
            setMsgType(editChatItem.messageType)
        }
    }, [editChatItem])

    const addMessage = () => {
        if (editChatItem) {
            const chatItem = {
                id: editChatItem.id,
                type: 'MESSAGE',
                value: (msgType === msgTypes.GIF) ? gif : msg,
                messageType: msgType
            }
            dispatch(editChatItemAction(chatItem))
        }
        if (((msg) && (!editChatItem)) || ((msgType === msgTypes.GIF) && (!editChatItem))) {
            const msgItem = {
                id: Date.now(),
                type: 'MESSAGE',
                value: (msgType === msgTypes.GIF) ? gif : msg,
                messageType: msgType
            }
            dispatch(addChatItem(msgItem))
        }
        setMsg('')
        setMsgType(msgTypes.USUAL)
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

    const changeMessageType = (e) => {
        setMsgType(e.target.value)
    }
    const cancelEdit = (e) => {
        e.preventDefault()
        dispatch(cancelMsgEdit())
        setMsg(`Type here the next Marq’s message`)
        setMsgType('USUAL')
    }

    return (
        <div className="d-flex flex-column justify-content-end">
            {msgType !== msgTypes.GIF
                ? <Editor msgType={msgType}
                          msg={msg}
                          handleChange={handleChange}
                          con={con}
                          keyPress={keyPress}
                   />
                : <GiphyPicker gif={gif} setGif={setGif}/>
            }

            <div className="mt-3 d-flex justify-content-between">
                <MessageTypeChanger msgType={msgType} changeMessageType={changeMessageType}/>

                <div className="">
                    {editChatItem &&
                        <Button variant={"outline-primary"} className={"me-1"} onClick={(e) => cancelEdit(e)}>
                            Cancel
                        </Button>
                    }
                    <Button
                        onClick={addMessage}
                        variant="primary"
                        className={"justify-self-end"}
                        disabled={isEmpty || (!gif && msgType === msgTypes.GIF)}
                    >
                        {editChatItem ? 'Confirm changes' : 'Add message'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default MessageEditor;