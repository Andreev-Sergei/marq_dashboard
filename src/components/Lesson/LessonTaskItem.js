import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {Button, Card, Form, OverlayTrigger, Popover} from "react-bootstrap";
import ContentEditable from "react-contenteditable";
import {Trash, DistributeHorizontal, Front, Code} from "react-bootstrap-icons";
import {removeChatItem} from "../../store/reducers/lessonSlice";
import {useDispatch} from "react-redux";
import {keyboardTypesForTask, taskBank, taskBankArray} from "../../helpers/constants";
import {variantsConstructor} from "../../helpers";

const getWord = (str) => {
    const word = str.match(/<i[^>]*>([^<]+)<\/i>/)
    if (word) {
        const textWord = word[1]
        return word ? textWord : ''
    }
}


const LessonTaskItem = ({item}) => {
    const [msg, setMsg] = useState(item.value || ``)
    const [word, setWord] = useState(item?.variants?.find(variant => variant.right == true)?.word || null)
    const [activeKeyboardType, setActiveKeyboardType] = useState(item.keyboardType || keyboardTypesForTask[0].id)
    const [variants, setVariants] = useState(item.variants || variantsConstructor(activeKeyboardType))
    const [edit, setEdit] = useState(false)
    const [itemType, setItemType] = useState({title: item.typeTitle, constantName: item.taskType})
    const [taskDescription, setTaskDescription] = useState(item.description || '')
    const dispatch = useDispatch()

    const keyPress = (event) => {
        if (event.charCode === 13) {
            event.preventDefault()
        }
    }
    const handleInputChange = evt => {
        const value = evt.target.value
        setMsg(value.replaceAll('&nbsp;', ' '));
        if (!item.isNew) {
            setEdit(true)
        }
    };
    const handleRemoveChatItem = () => {
        dispatch(removeChatItem(item.id))
        if (!item.isNew) {
            setEdit(true)
        }
    }
    useEffect(() => {
        const currectWord = getWord(msg)
        setWord(currectWord)
    }, [msg])

    useEffect(() => {
        const msgWithReplacedCurrectWord = msg.replace(`<i>${getWord(msg)}</i>`, `<i>${word}</i>`)
        setMsg(msgWithReplacedCurrectWord)
    }, [word])

    const handleChangeKeyboardType = (keyboardTypeId) => {
        setActiveKeyboardType(keyboardTypeId)
        setVariants(variantsConstructor(keyboardTypeId, variants))

        if (!item.isNew) {
            setEdit(true)
        }
    }

    const handleChangeVariant = (variant, value) => {
        if (variant.right) {
            setWord(value)
        } else {
            setVariants([...variants.map((variantItem, i) => {
                    return (variantItem.id === variant.id) ?
                        {...variantItem, word: value}
                        : variantItem
                })]
            )
        }
        if (!item.isNew) {
            setEdit(true)
        }
    }

    const handleDescriptionChange = (value) => {
        setTaskDescription(value)
        if (!item.isNew) {
            setEdit(true)
        }
    }
    const handleChangeTaskType = (type) => {
        if (!item.isNew) {
            setEdit(true)
        }
        setItemType(type)
        document.body.click()
    }
    console.log(itemType)
    const popover = (
        <Popover style={{maxWidth: 338}} id="popover-basic" className={"p-1"}>
            {taskBankArray.filter(x=> x.constantName !== itemType.constantName).map(taskType => {
                return (
                    <p role={"button"}
                       key={taskType.constantName}
                       onClick={() => handleChangeTaskType(taskType)}
                       className={"mb-1 p-2"}>
                        {taskType.title}
                    </p>
                )
            })}
        </Popover>
    );
    return (
        <div>
            <Card className={`my-2 py-2 px-2 d-inline-block `}
                  style={{width: 450, background: '#F7F7F7'}}>
                <div className={"d-flex mb-2 py-2 justify-content-between align-items-center"}>
                    <p className={"m-0"}>{itemType.title}</p>
                    <div className="">
                        <Trash className={"mx-2"} role={"button"} onClick={handleRemoveChatItem}>Remove</Trash>
                        <OverlayTrigger
                            rootClose trigger={"click"}
                            placement="bottom"
                            overlay={popover}>
                            <Front role={"button"}></Front>
                        </OverlayTrigger>
                    </div>
                </div>
                <Form.Group className="mb-3" controlId="taskDescription">
                    <Form.Control type="text" value={taskDescription}
                                  onChange={e => handleDescriptionChange(e.target.value)}
                                  placeholder="Task description (optional)"/>
                </Form.Group>
                {itemType.constantName !== taskBank.MATCHING && <Card>
                    <Card.Header className={"px-0"}>
                        <>
                            <Code
                                color={"#0d6efd"}
                                onMouseDown={evt => {
                                    evt.preventDefault();
                                    document.execCommand('italic', false, 'italic');
                                }}
                            />
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

                </Card>}
                {itemType.constantName === taskBank.MATCHING ? <div className={"px-0 py-3 "}>
                    <Form.Group
                        className="mb-3 d-flex"
                        controlId="currectAnswer">

                        <Form.Control type="text"
                                      className={"me-1"}
                                      defaultValue={""}
                            // onChange={(e) =>
                            //     handleChangeVariant(variant, e.target.value)
                            // }
                        />
                        <Form.Control type="text"
                                      className={"ms-1"}
                                      defaultValue={""}
                            // onChange={(e) =>
                            //     handleChangeVariant(variant, e.target.value)
                            // }
                        />
                    </Form.Group> <Form.Group
                    className="mb-3 d-flex"
                    controlId="currectAnswer">

                    <Form.Control type="text"
                                  className={"me-1"}
                                  defaultValue={""}
                        // onChange={(e) =>
                        //     handleChangeVariant(variant, e.target.value)
                        // }
                    />
                    <Form.Control type="text"
                                  className={"ms-1"}
                                  defaultValue={""}
                        // onChange={(e) =>
                        //     handleChangeVariant(variant, e.target.value)
                        // }
                    />
                </Form.Group> <Form.Group
                    className="mb-3 d-flex"
                    controlId="currectAnswer">

                    <Form.Control type="text"
                                  className={"me-1"}
                                  defaultValue={""}
                        // onChange={(e) =>
                        //     handleChangeVariant(variant, e.target.value)
                        // }
                    />
                    <Form.Control type="text"
                                  className={"ms-1"}
                                  defaultValue={""}
                        // onChange={(e) =>
                        //     handleChangeVariant(variant, e.target.value)
                        // }
                    />
                </Form.Group>
                </div> :
                <div style={{width: '70%'}}>
                    <div className={"px-0 py-3 d-flex align-content-center"}>
                        <Form.Select aria-label="Default select example"
                                     onChange={e => handleChangeKeyboardType(+e.target.value)}
                                     defaultValue={activeKeyboardType}
                        >
                            {keyboardTypesForTask.map(({id, title}) => {
                                return <option key={id} value={id}>{title}</option>
                            })}
                        </Form.Select>
                    </div>

                    {(activeKeyboardType === keyboardTypesForTask[0].id || activeKeyboardType === keyboardTypesForTask[1].id) && itemType.constantName !== taskBank.MATCHING &&
                        <div>
                            {variants?.map((variant) => {
                                return <Form.Group
                                    key={`variants_${variant.id}`}
                                    className="mb-3 d-flex"
                                    controlId="currectAnswer">
                                    <Form.Control type="text"
                                                  disabled={(!word)}
                                                  value={(variant.right && word) ? word : variant.word}
                                                  onChange={(e) =>
                                                      handleChangeVariant(variant, e.target.value)
                                                  }
                                    />
                                    <div className={"d-flex align-content-center align-items-center px-3"}
                                         style={{background: '#E9ECEF'}}>
                                        <Form.Check defaultChecked={variant.right} disabled className={"me-2"}/>
                                        Correct
                                    </div>
                                </Form.Group>

                            })}
                        </div>
                    }

                    <div className={"p-1"}>
                        <small>activeKeyboardTypeId = {activeKeyboardType}</small>
                        <hr className={"my-0"}/>
                        <small> {keyboardTypesForTask[activeKeyboardType - 1].title}</small>
                    </div>
                </div>
                }
                {item.isNew && <Button onClick={() => {
                    console.log(item)
                }} size={"sm"} className={"py-1"}>Save</Button>}
                {edit && <Button onClick={() => {
                    console.log(item)
                }} size={"sm"} className={"py-1"}>Confirm</Button>}
            </Card>
        </div>
    );
};

export default LessonTaskItem;