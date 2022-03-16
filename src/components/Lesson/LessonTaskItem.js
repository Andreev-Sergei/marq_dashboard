import React, {useEffect, useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import ContentEditable from "react-contenteditable";
import {Trash} from "react-bootstrap-icons";
import {removeChatItem} from "../../store/reducers/lessonSlice";
import {useDispatch} from "react-redux";


const taskMethods = [
    {id: 1, title: 'Choice 1 of 2 variants'},
    {id: 2, title: 'Choice 1 of 4 variants'},
    {id: 3, title: 'Sentence creation using the prompts'},
    {id: 4, title: 'All letters keyboard'},
    {id: 5, title: 'Highlighted keyboard'},
]

const getWord = (str) => {

    const word = str.match(/<i[^>]*>([^<]+)<\/i>/)//str.split(' ').filter(x => x.includes('<i>'))[0]\
    if (word) {
        const textWord = word[1]
        return word ? textWord : ''
    }
}


const LessonTaskItem = ({item}) => {
    const [msg, setMsg] = useState(item.value || ``)
    const [word, setWord] = useState(getWord(msg) || null)
    const [activeMethod, setActiveMethod] = useState(item.method || 1)
    const dispatch = useDispatch()
    const keyPress = (event) => {
        if (event.charCode === 13) {
            event.preventDefault()
        }
    }
    const handleInputChange = evt => {
        const value = evt.target.value
        setMsg(value.replaceAll('&nbsp;', ' '));
        // console.log(getWord(value), word)
    };
    const handleRemoveChatItem = () => {
        dispatch(removeChatItem(item.id))
    }
    useEffect(() => {
        const currectWord = getWord(msg)
        setWord(currectWord)
    }, [msg])

    useEffect(()=>{
        const msgWithReplacedCurrectWord = msg.replace(`<i>${getWord(msg)}</i>`, `<i>${word}</i>`)
        setMsg(msgWithReplacedCurrectWord)
    },[word])

    return (
        <div>
            <Card className={`my-2 py-2 px-2 d-inline-block `}
                  style={{width: '70%', background: '#F7F7F7'}}>
                <div className={"d-flex mb-2 py-2 justify-content-between align-items-center"}>
                    <p className={"m-0"}>{item.typeTitle}</p>
                    <Trash className={"mx-2"} role={"button"} onClick={handleRemoveChatItem}>Remove</Trash>
                </div>
                <Form.Group className="mb-3" controlId="taskDescription">
                    <Form.Control type="text" placeholder="Task description (optional)"/>
                </Form.Group>
                <Card>
                    <Card.Header className={"px-0"}>
                        <>
                            <button
                                style={{background: 'transparent', border: 'none'}}
                                onMouseDown={evt => {
                                    evt.preventDefault();
                                    document.execCommand('italic', false, 'italic');
                                }}
                            >
                                evt
                            </button>
                        </>
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
                <div style={{width: '70%'}}>
                    <div className={"px-0 py-3 d-flex align-content-center"}>
                        <Form.Select aria-label="Default select example"
                                     onChange={(e) => {
                                         setActiveMethod(+ e.target.value)
                                     }}
                                     defaultValue={activeMethod}
                        >
                            {taskMethods.map(({id, title}) => {
                                return <option key={id} value={id}>{title}</option>
                            })}
                        </Form.Select>
                            <p>{activeMethod}</p>
                    </div>
                    {(activeMethod === 1 || activeMethod === 2) &&
                        <div>
                            <Form.Group className="mb-3 d-flex" controlId="currectAnswer">
                                <Form.Control type="text" value={word ? word : ''} disabled={!word}
                                              onChange={(e) => {
                                                  setWord(e.target.value)
                                              }
                                              }/>
                                <div className={"d-flex align-content-center align-items-center px-3"}
                                     style={{background: '#E9ECEF'}}>
                                    <Form.Check defaultChecked={true} className={"me-2"}/> Correct
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex" controlId="currectAnswer">
                                <Form.Control type="text" value={""}
                                              onChange={(e) => {

                                                  setWord(e.target.value)
                                              }
                                              }/>
                                <div className={"d-flex align-content-center align-items-center px-3"}
                                     style={{background: '#E9ECEF'}}>
                                    <Form.Check defaultChecked={false} className={"me-2"}/> Correct
                                </div>
                            </Form.Group>
                        </div>}

                </div>
                {item.isNew && word && <Button size={"sm"} className={"py-1"}>Save</Button>}
            </Card>
        </div>
    );
};

export default LessonTaskItem;