import React, {createRef, useEffect, useRef, useState} from 'react';
import {Button, Card, Form, OverlayTrigger, Popover} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addChatItem, cancelMsgEdit, editChatItem as editChatItemAction} from "../../store/reducers/lessonSlice";
import ContentEditable from "react-contenteditable";
import * as sanitizeHtml from 'sanitize-html';
import GiphyPicker from "./GiphyPicker";
import Picker from "emoji-mart/dist-modern/components/picker/picker";


const EditButton = ({cmd, arg, name}) => {
    return (
        <button
            style={{background: 'transparent', border: 'none'}}
            key={cmd}
            onMouseDown={evt => {
                evt.preventDefault();
                document.execCommand(cmd, true, arg);
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
    const [gif, setGif] = useState(null)
    const [isEmpty, setIsEmpty] = useState(false)
    const dispatch = useDispatch()
    const con = useRef(null)

    const popover = (
        <Popover
            style={{maxWidth: 338, padding: 0, border: 0}}
            id="popover-basic"
        >
            <Picker set='facebook'
                    emojiSize={24}
                    showPreview={false}
                    emojiTooltip={false}
                    showSkinTones={false}
                // exclude={['people', 'symbols', 'recent', 'smileys', 'foods', 'activity', 'places', 'objects', 'symbols', 'nature']}
                    style={{width: 400}}
                    onSelect={({native}) => {
                        document.execCommand("insertHTML", true, native);
                        document.body.click()
                    }}
            />
        </Popover>
    );
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
                value: (msgType === 'GIF') ? gif : msg,
                messageType: msgType
            }
            dispatch(editChatItemAction(chatItem))
        }
        if (((msg) && (!editChatItem)) || ((msgType === 'GIF') && (!editChatItem))) {
            const msgItem = {
                id: Date.now(),
                type: 'MESSAGE',
                value: (msgType === 'GIF') ? gif : msg,
                messageType: msgType
            }
            console.log(msgItem)
            dispatch(addChatItem(msgItem))
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
            {msgType !== 'GIF' ? <Card>
                    <Card.Header>
                        {/*TODO вынести элементы управления в отдельный компонент*/}

                        <>
                            {msgType === 'USUAL' && <EditButton cmd="bold"/>}
                            <EditButton cmd="italic" arg="jest" name="voice"/>
                            {msgType === 'USUAL' &&
                                <EditButton cmd="insertHTML" arg='<small>USER</small>&nbsp;' name="user"/>}
                            {msgType === 'USUAL' && <OverlayTrigger
                                rootClose trigger={"click"}
                                placement="right"
                                overlay={popover}>
                                <button
                                    style={{background: 'transparent', border: 'none'}}
                                    onMouseDown={evt => {
                                        evt.preventDefault();
                                    }}>emoji
                                </button>
                            </OverlayTrigger>
                            }
                            {/*TODO add emoji picker & functionality*/}
                        </>
                    </Card.Header>
                    <Card.Body className={"m-0 mb-2 p-0"}>
                        <ContentEditable
                            className="m-3"
                            id={'contetntEditable'}
                            style={{height: 60}}
                            tagName="div"
                            onKeyPress={keyPress}
                            html={msg}
                            disabled={false}
                            onChange={handleChange}
                            ref={con}
                        />
                    </Card.Body>
                </Card>
                : <GiphyPicker gif={gif} setGif={setGif}/>
            }

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
                        className={"me-3"}
                        type={"radio"}
                        name={`inline`}
                        value={"VOCABULARY"}
                        id={"VOCABULARY"}
                        checked={(msgType == "VOCABULARY")}
                        label={`Vocabulary`}
                    />
                    <Form.Check
                        onChange={changeMessageType}
                        type={"radio"}
                        name={`inline`}
                        value={"GIF"}
                        id={"GIF"}
                        checked={(msgType == "GIF")}
                        label={`Gif`}
                    />
                </Form>

                <div className="">
                    {editChatItem && <Button variant={"outline-primary"} className={"me-1"}
                                             onClick={(e) => cancelEdit(e)}>Cancel</Button>}
                    <Button
                        onClick={addMessage}
                        variant="primary"
                        className={"justify-self-end"}
                        disabled={isEmpty}
                    >
                        {editChatItem ? 'Confirm changes' : 'Add message'}
                    </Button>
                </div>
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