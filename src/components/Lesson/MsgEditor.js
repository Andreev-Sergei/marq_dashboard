import React, {useState} from 'react';
import {Button, Card, FormCheck} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addChatItem} from "../../store/reducers/lessonSlice";
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

const MsgEditor = ({msgWindow}) => {
    const [msg, setMsg] = useState(`Type here the next Marq’s message`)
    const dispatch = useDispatch()

    const addMassage = () => {
        dispatch(addChatItem({id: Date.now(), type: 'MESSAGE', value: msg}))
        setMsg('')
        msgWindow.scrollTop = msgWindow.scrollHeight + 80
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
    };

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
                <div className={"d-flex"}>
                    <FormCheck inline type={"radio"} name={`inline`} label={`Usual`} defaultChecked id={'1'}/>
                    <FormCheck inline id={'2'} type={"radio"} name={`inline`} label={`Vocabulary`}/>
                </div>
                <Button
                    onClick={addMassage}
                    variant="primary"
                    className={"justify-self-end"}
                >
                    Add message
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