import React, {useEffect, useRef, useState} from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {cancelMessageEdit} from "../../../store/reducers/lessonSlice";
import * as sanitizeHtml from 'sanitize-html';
import GiphyPicker from "./MessageEditorElements/GiphyPicker";
import {msgTypes} from "../../../helpers/constants";
import Editor from "./MessageEditorElements/Editor";
import MessageTypeChanger from "./MessageEditorElements/MessageTypeChanger";
import MessageService from "../../../services/LessonServices/MessageService";
import ImagePicker from "./MessageEditorElements/ImagePicker";


const MessageEditor = () => {
    const {editChatItem, board, lessonId} = useSelector(state => state.lesson)
    const [msg, setMsg] = useState(`Type here the next Marq’s message`)
    const [msgType, setMsgType] = useState(msgTypes.IMAGE)
    const [gif, setGif] = useState(null)
    const [img, setImg] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const dispatch = useDispatch()
    const con = useRef(null)

    useEffect(() => {
        if (editChatItem) {
            setMsg(editChatItem.message.value)
            setMsgType(editChatItem.message.messageType)
        }
    }, [editChatItem])

    const addMessage = () => {

        if (editChatItem) {
            const chatItem = {
                id: editChatItem.message.id,
                type: 'MESSAGE',
                value: (msgType === msgTypes.GIF) ? gif : msg,
                messageType: msgType
            }
            dispatch(MessageService.editMessage(chatItem, lessonId, editChatItem.blockId))

            setGif(null)
        }


        if (((msg) && (!editChatItem)) || ((msgType === msgTypes.GIF) &&
            (!editChatItem)) || ((msgType === msgTypes.IMAGE) && (!editChatItem))) {
            const lastBlock = board[0]
            const addWithNewBlock = lastBlock?.userInput !== null
            const value = (msgType) => {
                switch (msgType) {
                    case msgTypes.GIF:
                        return gif;
                        break
                    case msgTypes.IMAGE:
                        return img.file
                        break
                    default:
                        return msg
                        break
                }
            }
            const message = {
                type: 'MESSAGE',
                value: value(msgType),
                messageType: msgType
            }
            dispatch(MessageService.addMessage(lessonId, message, addWithNewBlock, lastBlock?.blockId))

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

    // const sanitize = () => {
    //     const a = sanitizeHtml(msg.replace('&nbsp;', ' '), sanitizeConf)
    //     setMsg(a);
    // };

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
        dispatch(cancelMessageEdit())
        setMsg(`Type here the next Marq’s message`)
        setMsgType('USUAL')
    }

    return (
        <div className="d-flex flex-column justify-content-end">

            {(msgType === msgTypes.VOCABULARY || msgType === msgTypes.USUAL) &&
                <Editor msgType={msgType}
                        msg={msg}
                        handleChange={handleChange}
                        con={con}
                        keyPress={keyPress}
                />
            }
            {msgType === msgTypes.GIF &&  <GiphyPicker gif={gif} setGif={setGif}/>}
            {msgType === msgTypes.IMAGE &&  <ImagePicker img={img} setImg={setImg}/>}


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